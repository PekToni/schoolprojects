using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyDamageInfo : MonoBehaviour
{
    private SpriteRenderer _renderer;
    private AudioSource _damageSound;
    
    

    void Start()
    {
        _renderer = GetComponent<SpriteRenderer>();
        _damageSound = GetComponent<AudioSource>();
    }

    // Change sprite color to red when hit
    void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.tag == "Bullet")
        {
            _renderer.color = new Color(2, 0, 0);
            _damageSound.enabled = true;
            _damageSound.Play();
        }
        
    }

    // Change color back to normal
    void Update()
    {
        _renderer.color = Color.Lerp(_renderer.color, Color.white, Time.deltaTime / 0.5f);
    }
}
