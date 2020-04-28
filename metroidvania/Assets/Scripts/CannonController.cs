using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CannonController : MonoBehaviour
{
    [SerializeField] private GameObject _cannonLaser;
    [SerializeField] private Transform _player;

    private float _timer;
    private float _waitTime = 3;
    
    void Start()
    {
        
    }

    
    void Update()
    {
        if (_player != null)
        {
            if (Vector2.Distance(transform.position, _player.transform.position) < 15)
            {
                _timer += Time.deltaTime;
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
        Instantiate(_cannonLaser, transform.position, transform.rotation);
    }
}
