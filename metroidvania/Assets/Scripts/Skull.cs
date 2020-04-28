using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Skull : MonoBehaviour
{
    [SerializeField] private float _speed;
    [SerializeField] private GameObject _bulletPrefab;
    
    private PlayerController _player;
    private float _angle = 0;

    private void Start()
    {
        _player = GameObject.Find("Player").GetComponent<PlayerController>();
    }

    void Update()
    {
        if (_player != null)
        {
            if (Vector2.Distance(transform.position, _player.transform.position) < 7)
            {
                Explode();
                Destroy(gameObject);
            }
        }
    }

    void Explode()
    {
        for (int i = 0; i < 18; i++)
        {
            Quaternion rotation = Quaternion.AngleAxis(_angle, transform.forward);
            Instantiate(_bulletPrefab, transform.position, rotation);
            _angle += 20;
        }
    }
}
