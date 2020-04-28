using System.Collections;
using System.Collections.Generic;
using System.Numerics;
using UnityEngine;
using Quaternion = UnityEngine.Quaternion;
using Vector2 = UnityEngine.Vector2;
using Vector3 = UnityEngine.Vector3;

public class OctobusLaser : MonoBehaviour
{
    [SerializeField] private Transform _player;
    [SerializeField] private Transform _firePoint;
    [SerializeField] private float _laserWaitTime;
    [SerializeField] private float _bulletWaitTime;
    [SerializeField] private float _screamWaitTime;
    [SerializeField] private GameObject _octoBulletPrefab;
    [SerializeField] private GameObject _octoLaserPrefab;
    [SerializeField] private AudioSource[] _sources = new AudioSource[4];
  
    private float _timer;
    private float _timer2;
    private float _timer3;
    private SpriteRenderer _renderer;
    private float _angle = -20f;
    private bool _activateTentacles = true;
    private Enemy _octobus;

    void Start()
    {
        AudioSource[] _sources = GetComponents<AudioSource>();
        _octobus = GetComponent<Enemy>();
        _renderer = GetComponent<SpriteRenderer>();
    }

    void Update()
    {
        // Change color back to normal
        _renderer.color = Color.Lerp(_renderer.color, Color.white, Time.deltaTime / 0.5f);

        // Timed behaviour
        if (_player != null)
        {
            if (Vector2.Distance(transform.position, _player.transform.position) < 20)
            {
                _timer += Time.deltaTime;
                _timer2 += Time.deltaTime;
                _timer3 += Time.deltaTime;
                if (_timer > _laserWaitTime)
                {
                    Shoot();
                    _timer = 0;
                }

                if (_timer2 > _bulletWaitTime)
                {
                    StartCoroutine(ShootBullets());
                    _timer2 = 0;
                }

                if (_timer3 > _screamWaitTime)
                {
                    _sources[2].Play();
                    _timer3 = 0;
                }
            }
        }
        
        // Activate tentacles and start flashing in red if health under 200
        if (_octobus._imDead)
        {
            if (_activateTentacles)
            {
                ActivateTentacles();
            }

            ColorChange();
        }
    }

    // Laser
    void Shoot()
    {
        Instantiate(_octoLaserPrefab, _firePoint.position + new Vector3(-5,0,0), _firePoint.rotation);
        _sources[1].Play();
    }

    // Angled bullets pattern
    IEnumerator ShootBullets()
    {
        for (int i = 0; i < 8; i++)
        {
            _angle += 5f;
            Quaternion rotation = Quaternion.AngleAxis(_angle, transform.forward) * transform.rotation;
            Instantiate(_octoBulletPrefab, _firePoint.position, rotation);
            _sources[0].Play();
            yield return new WaitForSeconds(0.1f);
        }

        yield return new WaitForSeconds(0.8f);

        for (int i = 0; i < 8; i++)
        {
            _angle -= 5f;
            Quaternion rotation = Quaternion.AngleAxis(_angle, transform.forward) * transform.rotation;
            Instantiate(_octoBulletPrefab, _firePoint.position, rotation);
            _sources[0].Play();
            yield return new WaitForSeconds(0.1f);
        }
    }

    // Change sprite color to red when hit
    void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.tag == "Bullet")
        {
            _renderer.color = new Color(2, 0, 0);
            _sources[3].Play();
        }

    }

    // Flashing in red
    public void ColorChange()
    {
        // Making enemy flash
        Color red = new Color(2, 0, 0, 1);
        _renderer.color = Color.Lerp(Color.white, red, Mathf.PingPong(Time.time, 0.5f));
    }

    void ActivateTentacles()
    {
        GameObject[] tentacles = GameObject.FindGameObjectsWithTag("tentacle");
        for (int i = 0; i < tentacles.Length; i++)
        {
           tentacles[i].GetComponent<Tentacle>().ActivateTheTentacle(true);
        }

        _activateTentacles = false;
    }
}
