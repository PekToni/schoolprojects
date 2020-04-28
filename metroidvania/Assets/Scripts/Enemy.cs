using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Enemy : MonoBehaviour
{
    [SerializeField] private int _health;
    [SerializeField] private GameObject _deathEffect;
    [SerializeField] private GameObject _gameEnd;
    
    private bool _movingLeft = true;
    private Animator _anim;
    public bool _faceleft = true;
    internal bool _imDead;
    

    public void TakeDamage(int damage)
    {
        _health -= damage;
        if (_health <= 0)
        {
            Die();
        }
    }

    void Update()
    {
        if (_health < 200)
        {
            _imDead = true;
        }
    }

    void Die()
    {

        if (gameObject.tag == "Octobus")
        {
            Instantiate(_gameEnd, transform.position, Quaternion.identity);
            Instantiate(_deathEffect, transform.position, Quaternion.identity);
            Destroy(gameObject);
        }

        Instantiate(_deathEffect, transform.position, Quaternion.identity);
        Destroy(gameObject);
    }

    public void Flip()
    {
        Vector3 scale = transform.localScale;
        scale.x *= -1;
        transform.localScale = scale;
        _faceleft = !_faceleft;
    }
}
