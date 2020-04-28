using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class JumperPlayerFollow : MonoBehaviour
{
    [SerializeField] private Transform _player;
    [SerializeField] private float _speed;
    [SerializeField] private Transform _groundCheck;
    [SerializeField] private LayerMask _whatIsGround;
    [SerializeField] private float _jumpForce;
    [SerializeField] private float _waitTime;

    private float _groundRadius = 0.2f;
    private bool _grounded;
    private float _timer = 0.0f;
    private Animator _anim;
    private Rigidbody2D _rb2d;

    void Start()
    {
        _anim = GetComponent<Animator>();
        _rb2d = GetComponent<Rigidbody2D>();
    }

    void FixedUpdate()
    {
        _grounded = Physics2D.OverlapBox(_groundCheck.position,
            new Vector2(1.5f, _groundRadius), 0f, _whatIsGround);

        // Detect player and start following
        if (_player != null)
        {
            Vector3 dir = (_player.transform.position - transform.position).normalized;

            if (Vector2.Distance(transform.position, _player.transform.position) < 15)
            {

                _timer += Time.deltaTime;
                if (_grounded && _timer > 2f)
                {
                    _rb2d.AddForce(new Vector2(dir.x * _speed, _jumpForce), ForceMode2D.Impulse);
                    _anim.SetBool("Jump", true);
                    _timer = 0;
                }
                else if (!_grounded)
                {
                    _anim.SetBool("Jump", false);
                }
            }

        }
    }
}
