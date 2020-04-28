using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyNodeMovement : MonoBehaviour
{
    [SerializeField] private float _speed;
    [SerializeField] private GameObject _nodeLeft;
    [SerializeField] private GameObject _nodeRight;

    private bool _movingLeft = true;
    private Animator _anim;
    private Enemy _enemy;

    void Start()
    {
        _anim = GetComponent<Animator>();
        _enemy = GetComponent<Enemy>();
    }


    void Update()
    {
        // Node follow section
        _anim.SetFloat("Speed", Mathf.Abs(_speed));

        if (_movingLeft == true)
        {
            // Move towards left node
            transform.Translate(-transform.right * _speed * Time.deltaTime);
            if (Vector2.Distance(_nodeLeft.transform.position, transform.position) < 1)
            {
                _movingLeft = false;
                _enemy.Flip();
            }
        }
        
        else if (_movingLeft == false)
        {
            // Move towards right node
            transform.Translate(transform.right * _speed * Time.deltaTime);
            if (Vector2.Distance(_nodeRight.transform.position, transform.position) < 1)
            {
                _movingLeft = true;
                _enemy.Flip();
            }
        }
    }
}
