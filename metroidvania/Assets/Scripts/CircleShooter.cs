using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CircleShooter : MonoBehaviour
{
    [SerializeField] private GameObject _bulletPrefab;
    [SerializeField] private Transform _firePoint;

    private float angle = 0;
    private Transform _player;
    private float _timer;
    private float _waitTime = 0.5f;

    private void Start()
    {
        _player = GameObject.Find("Player").GetComponent<Transform>();
    }

    void Update()
    {
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

    void Shoot()
    {
        for (int i = 0; i < 18; i++)
        {
            Quaternion rotation = Quaternion.AngleAxis(angle, transform.forward);
            Instantiate(_bulletPrefab, _firePoint.position, rotation);
            angle += 20;
        }
        
    }
}
