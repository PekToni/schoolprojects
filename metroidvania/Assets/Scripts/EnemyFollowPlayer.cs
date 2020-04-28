using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyFollowPlayer : MonoBehaviour
{
    [SerializeField] private Transform _player;
    [SerializeField] private float _speed;
    [SerializeField] private float _distance;

    private Enemy _enemy;
    private Animator _anim;

    void Start()
    {
        _enemy = GetComponent<Enemy>();
        _anim = GetComponent<Animator>();
    }

    void Update()
    {
        

        // Detect player and start following
        if (_player != null)
        {
            Vector3 dir = (_player.transform.position - transform.position).normalized;

            if (Vector2.Distance(transform.position, _player.transform.position) < _distance)
            {
                transform.position += (dir * _speed * Time.deltaTime);
                _anim.SetFloat("Speed", Mathf.Abs(_speed));
            }
        }

        if (_player != null)
        {
            if (_player.position.x > transform.position.x && !_enemy._faceleft)
            {
                _enemy.Flip();
            }
            else if (_player.position.x < transform.position.x && _enemy._faceleft)
            {
                _enemy.Flip();
            }
        }
    }
}
