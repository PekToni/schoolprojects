using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [SerializeField] private float _speed;
    [SerializeField] private Transform _groundCheck;
    [SerializeField] private LayerMask _whatIsGround;
    [SerializeField] private float _jumpForce;
    [SerializeField] private AudioClip _jumpSound;
    [SerializeField] private AudioClip _runSound;

    
    internal bool _facingRight = true;
    private bool _grounded;
    private bool _crouch = false;
    private float _trueSpeed;
    private float _crouchSpeed = 0f;
    private float _groundRadius = 0.2f;
    private float _colliderCrouch = 1f;
    private float _colliderX = 1.08f;
    private float _colliderY = 1.73f;
    private bool _playerMoving = false;

    private Rigidbody2D _rb2d;
    private CapsuleCollider2D _capsuleC2D;
    private Animator _anim;
    private AudioSource _source;
    private float _timer;

    public float _knockBack;
    public float _knockBackLength;
    internal float _knockBackCount;
    internal bool _knockFromRight;
    

    void Start()
    {
        _rb2d = GetComponent<Rigidbody2D>();
        _anim = GetComponent<Animator>();
        _capsuleC2D = GetComponent<CapsuleCollider2D>();
        _source = GetComponent<AudioSource>();
        _trueSpeed = _speed;
    }

    void FixedUpdate()
    {
        // Grounded check and animations
        _grounded = Physics2D.OverlapCircle(_groundCheck.position, _groundRadius, _whatIsGround);
        _anim.SetBool("Ground", _grounded);
        _anim.SetFloat("vSpeed", _rb2d.velocity.y);
        
        // Setting movement keys for player to move left and right
        float moveHorizontal = Input.GetAxis("Horizontal");

        // Setting run animation, mathf.abs makes the value positive stay positive to make the animation work correctly
        _anim.SetFloat("Speed", Mathf.Abs(moveHorizontal));

        // Movement of player, knockback effect included if enemy contact
        if (_knockBackCount <= 0)
        {
            _rb2d.velocity = new Vector2(moveHorizontal * _trueSpeed, _rb2d.velocity.y);
            if (moveHorizontal != 0 && _grounded)
            {
                _playerMoving = true;
            }
        }
        else
        {
            if (_knockFromRight)
            {
                _rb2d.velocity = new Vector2(-_knockBack, 0f);
                //_rb2d.AddForce(new Vector2(-_knockBack, 0), ForceMode2D.Impulse);
            }
            if (!_knockFromRight)
            {
                _rb2d.velocity = new Vector2(_knockBack, 0f);
                //_rb2d.AddForce(new Vector2(_knockBack, 0), ForceMode2D.Impulse);
            }
            _knockBackCount -= Time.deltaTime;
        }

        // Flipping player to face left and right
        if (moveHorizontal > 0 && !_facingRight)
        {
            Flip();
        }
        else if (moveHorizontal < 0 && _facingRight)
        {
            Flip();
        }

    }

    void Update()
    {
        // Button for jump
        bool jump = Input.GetButtonDown("Jump");

        // Jump script
        if (_grounded && jump)
        {
            _source.PlayOneShot(_jumpSound, 1f);
            _anim.SetBool("Ground", false);
            _rb2d.AddForce(new Vector2(0, _jumpForce));
        }

        // Crouch script, resizing capsule collider and setting crouch animation
        if (Input.GetKeyDown(KeyCode.DownArrow))
        {
            _anim.SetBool("Crouch", true);
            _capsuleC2D.size = new Vector2(_colliderCrouch,_colliderCrouch);
            _capsuleC2D.offset = new Vector2(0,-0.5f);
            _trueSpeed = _crouchSpeed;
        }
        else if (Input.GetKeyUp(KeyCode.DownArrow))
        {
            _anim.SetBool("Crouch", false);
            _capsuleC2D.size = new Vector2(_colliderX, _colliderY);
            _capsuleC2D.offset = new Vector2(0, 0);
            _trueSpeed = _speed;
        }

        // Aim up, setting animation
        if (Input.GetKeyDown(KeyCode.UpArrow))
        {
            _anim.SetBool("ShootUp", true);
            _trueSpeed = _crouchSpeed;
        }
        else if (Input.GetKeyUp(KeyCode.UpArrow))
        {
            _anim.SetBool("ShootUp", false);
            _trueSpeed = _speed;
        }
    }


    void Flip()
    {
        
        _facingRight = !_facingRight;
        transform.Rotate(0f, 180f, 0f);
    }
}
