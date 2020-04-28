using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NotMovable : MonoBehaviour
{
    private Rigidbody2D _rb2d;

    void Start()
    {
        _rb2d = GetComponent<Rigidbody2D>();
    }

    void OnCollisionEnter2D(Collision2D other)
    {
        if (other.transform.tag == "Player")
        {
            _rb2d.mass = 666;
        }
    }

    void OnCollisionExit2D(Collision2D other)
    {
        if (other.transform.tag == "Player")
        {
            _rb2d.mass = 1;
        }
    }
}
