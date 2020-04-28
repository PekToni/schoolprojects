using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AngryCrabb : MonoBehaviour
{
    [SerializeField] private GameObject _octoBullet;
    [SerializeField] private Transform _firePoint;

    private SpriteRenderer _renderer;
    private float angle = -120;
    private float _timer;
    private float _waitTime = 2;

    private PlayerController _player;

    void Start()
    {
        _renderer = GetComponent<SpriteRenderer>();
        _player = GameObject.Find("Player").GetComponent<PlayerController>();
    }

    private void Update()
    {
        ColorChange();

        // Get distance to player and act when close enough, waitTime to wait before shooting
        if (_player != null)
        {
            _timer += Time.deltaTime;
            if (Vector2.Distance(transform.position, _player.transform.position) < 15)
            {
                if (_timer > _waitTime)
                {
                    Shoot();
                    _timer = 0;
                }
            }
        }
    }

    void ColorChange()
    {
        // Making enemy flash
        Color red = new Color(2,0,0, 1);
        _renderer.color = Color.Lerp(Color.white, red, Mathf.PingPong(Time.time, 0.5f));
    }

    void Shoot()
    {
        // Shoot 3 bullets up
        for (int i = 0; i < 3; i++)
        {
            Quaternion rotation = Quaternion.AngleAxis(angle, Vector3.forward);
            Instantiate(_octoBullet, _firePoint.position, rotation);
            angle += 30f;
        }
        angle = -120f;
    }
}
