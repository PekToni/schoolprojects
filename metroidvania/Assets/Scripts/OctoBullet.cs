using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class OctoBullet : MonoBehaviour
{
    [SerializeField] private float _speed;
    [SerializeField] private Rigidbody2D _rb2d;
    [SerializeField] private int _damage;
    [SerializeField] private GameObject _impactEffect;
    [SerializeField] private bool _isTrigger;

    private AudioSource _source;
    private CircleCollider2D _collider;

    void Start()
    {
        _rb2d.velocity = -transform.right * _speed;
        if (gameObject.GetComponent<CircleCollider2D>() != null)
        {
            _collider = GetComponent<CircleCollider2D>();
        }

        // If _isTrigger is false, set collider trigger to false and invoke the value to true after 0,2sec
        if (_isTrigger == false)
        {
            _collider.isTrigger = false;
            Invoke("NoContact", 0.2f);
        }
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

    void NoContact()
    {
        _collider.isTrigger = true;
    }
}
