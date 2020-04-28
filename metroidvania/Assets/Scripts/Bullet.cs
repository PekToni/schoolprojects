using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Bullet : MonoBehaviour
{
    [SerializeField] private float _speed;
    [SerializeField] private Rigidbody2D _rb2d;
    [SerializeField] private int _damage;
    [SerializeField] private GameObject _impactEffect;
    [SerializeField] private AudioClip _gunSound;


    private AudioSource _source;

    void Awake()
    {
        _source = GetComponent<AudioSource>();
    }
    void Start()
    {
        _source.PlayOneShot(_gunSound, 0.6f);
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
