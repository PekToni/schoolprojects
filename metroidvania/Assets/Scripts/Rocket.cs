using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Rocket : MonoBehaviour
{
    [SerializeField] private float _speed;
    [SerializeField] private Rigidbody2D _rb2d;
    [SerializeField] private int _damage;
    [SerializeField] private GameObject _impactEffect;
    [SerializeField] private AudioClip _gunSound;
    [SerializeField] private GameObject _smokeTrail;

    private AudioSource _source;

    void Awake()
    {
        _source = GetComponent<AudioSource>();
    }
    void Start()
    {
        _source.PlayOneShot(_gunSound, 1f);
    }

    void FixedUpdate()
    {
        _rb2d.AddForce(transform.right * _speed, ForceMode2D.Force);
        Instantiate(_smokeTrail, transform.position, transform.rotation);
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
