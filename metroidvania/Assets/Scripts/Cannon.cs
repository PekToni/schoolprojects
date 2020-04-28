using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Cannon : MonoBehaviour
{
    [SerializeField] private float _speed;
    [SerializeField] private Rigidbody2D _rb2d;
    [SerializeField] private int _damage;
    [SerializeField] private GameObject _impactEffect;
    [SerializeField] private AudioClip _clip;


    private AudioSource _source;

    void Start()
    {
        transform.Rotate(0,0,180, Space.Self);
        _rb2d.velocity = -transform.right * _speed;
        _source = GetComponent<AudioSource>();
        _source.PlayOneShot(_clip);
    }

    void OnTriggerEnter2D(Collider2D hitInfo)
    {

        PlayerController player = hitInfo.GetComponent<PlayerController>();
        PlayerHealth health = hitInfo.GetComponent<PlayerHealth>();
        if (player != null)
        {
            health.TakeDamage(_damage);
        }

        Instantiate(_impactEffect, transform.position, transform.rotation);
        Destroy(gameObject);
    }
}