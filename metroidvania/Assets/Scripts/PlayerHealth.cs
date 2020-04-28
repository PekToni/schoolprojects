using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class PlayerHealth : MonoBehaviour
{
    [SerializeField] private int _health;
    [SerializeField] private GameObject _deathEffect;
    [SerializeField] private Text _energyText;

    public Texture2D[] _healthTable = new Texture2D[5];
    
    private Animator _anim;
    private bool _damaged = false;
    private int _maxHealth = 100;

    void Start()
    {
        _anim = GetComponent<Animator>();
    }

    void OnGUI()
    {
        if (_health >= 1)
        {
            GUI.DrawTexture(new Rect(130, 10, 20, 20), _healthTable[0]);
        }
        if (_health >= 20)
        {
            GUI.DrawTexture(new Rect(150, 10, 20, 20), _healthTable[1]);
        }
        if (_health >= 40)
        {
            GUI.DrawTexture(new Rect(170, 10, 20, 20), _healthTable[2]);
        }
        if (_health >= 60)
        {
            GUI.DrawTexture(new Rect(190, 10, 20, 20), _healthTable[3]);
        }
        if (_health >= 80)
        {
            GUI.DrawTexture(new Rect(210, 10, 20, 20), _healthTable[4]);
        }
    }

    void Update()
    {
        _energyText.text = "Energy ";
 
        if (_damaged)
        {
            _anim.SetBool("Hurt", true);
            _damaged = false;
        }
        else
        {
            _anim.SetBool("Hurt", false);
        }

    }

   
    public void TakeDamage(int damage)
    {
        _damaged = true;
        _health -= damage;
        if (_health <= 0)
        {
            Die();
        }
    }

    public void TakeHealth(int health)
    {
        _health += health;
        if (_health >= _maxHealth)
        {
            _health = _maxHealth;
        }
    }

    void Die()
    {
        Instantiate(_deathEffect, transform.position, Quaternion.identity);
        Destroy(gameObject);
    }
}
