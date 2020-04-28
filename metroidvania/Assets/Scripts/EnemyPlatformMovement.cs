using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyPlatformMovement : MonoBehaviour
{
    [SerializeField] private float _distanceToEdge;
    [SerializeField] private Transform _groundDetection;
    [SerializeField] private float _speed;

    private bool _movingLeft = true;
    private Animator _anim;
    

    void Start()
    {
        _anim = GetComponent<Animator>();
    }

    void Update()
    {
        // Move to left
        transform.Translate(Vector2.left * _speed * Time.deltaTime);
        _anim.SetFloat("Speed", Mathf.Abs(_speed));

        // Check if near is edge and turn around
        RaycastHit2D groundInfo = Physics2D.Raycast(_groundDetection.position, Vector2.down, _distanceToEdge);
        if (groundInfo.collider == false)
        {
            if (_movingLeft == true)
            {
                transform.eulerAngles = new Vector3(0, -180, 0);
                _movingLeft = false;
            }
            else
            {
                transform.eulerAngles = new Vector3(0, 0, 0);
                _movingLeft = true;
            }
        }
    }
}
