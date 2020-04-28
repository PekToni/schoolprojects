using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Tentacle : MonoBehaviour
{
    [SerializeField] private AudioClip _clip;
    [SerializeField] private GameObject _bulletPrefab;
    [SerializeField] private Transform _firePoint;
    [SerializeField] private float _shootInterval;

    private AudioSource _source;
    private SpriteRenderer _renderer;
    private PlayerController _player;
    private OctobusLaser _octobus;
    private float _angle = -10f;
    private float _timer;

    internal bool _activate = false;


    void Start()
    {
        _player = GameObject.Find("Player").GetComponent<PlayerController>();
        _octobus = GameObject.Find("Octobus").GetComponent<OctobusLaser>();
        _renderer = GetComponent<SpriteRenderer>();
        _source = GetComponent<AudioSource>();
        _source.clip = _clip;
        _activate = false;
    }

    void Update()
    {
        if (_player != null && _activate)
        {
            ColorChange();
            if (Vector2.Distance(transform.position, _player.transform.position) < 25)
            {
                _timer += Time.deltaTime;
                if (_timer > _shootInterval)
                {
                    Shoot();
                    _timer = 0;
                }
            }
        }

        if (_octobus == null)
        {
            Die();
        }
    }

    void Shoot()
    {
        for (int i = 0; i < 8; i++)
        {
            _angle += 5f;
            Quaternion rotation = Quaternion.AngleAxis(_angle, transform.forward) * transform.rotation;
            Instantiate(_bulletPrefab, _firePoint.position, rotation);
            _source.Play();
        }
        _angle = -10f;
    }

    public void ColorChange()
    {
        // Making enemy flash
        Color red = new Color(2, 0, 0, 1);
        _renderer.color = Color.Lerp(Color.white, red, Mathf.PingPong(Time.time, 0.5f));
    }

    void Die()
    {
        Destroy(gameObject);
    }

    public void ActivateTheTentacle(bool activate)
    {
        _activate = activate;
    }
}
