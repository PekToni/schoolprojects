using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerDamager : MonoBehaviour
{
    [SerializeField] private int _damage;
    [SerializeField] private PlayerController _player;
    [SerializeField] private PlayerHealth _health;


    void OnCollisionEnter2D(Collision2D hitInfo)
    {
        if (hitInfo.transform.tag == "Player")
        {
            _health.TakeDamage(_damage);
            _player._knockBackCount = _player._knockBackLength;

            if (hitInfo.transform.position.x < transform.position.x)
            {
                _player._knockFromRight = true;
            }
            else
            {
                _player._knockFromRight = false;
            }
        }
    }
}
