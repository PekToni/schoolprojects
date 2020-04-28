using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FlashingWhenDamaged : MonoBehaviour
{
    private SpriteRenderer _renderer;

    void Start()
    {
        _renderer = GetComponent<SpriteRenderer>();
    }

    // Change sprite color to red when hit
    void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.tag == "Enemy") 
            _renderer.color = new Color(2, 0, 0);
    }

    void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.tag == "EnemyBullet")
            _renderer.color = new Color(2, 0, 0);
    }

    // Change color back to normal
    void Update()
    {
       _renderer.color = Color.Lerp(_renderer.color, Color.white, Time.deltaTime / 0.5f);
    }
}

