using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BulletUp : MonoBehaviour
{
    [SerializeField] private float _speed;
    [SerializeField] private Rigidbody2D _rb2d;
    [SerializeField] private int _damage;
    [SerializeField] private GameObject _impactEffect;

    void Start()
    {
        transform.rotation = Quaternion.Euler(0,0,90);
        _rb2d.velocity = transform.right * _speed;
    }

    void OnTriggerEnter2D(Collider2D hitInfo)
    {
        Enemy enemy = hitInfo.GetComponent<Enemy>();
        if (enemy != null)
        {
            enemy.TakeDamage(_damage);
        }

        Instantiate(_impactEffect, transform.position, transform.rotation);
        Destroy(gameObject);
    }
}
