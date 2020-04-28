using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Water : MonoBehaviour
{
    internal int _damage = 100;
    

    void OnTriggerEnter2D(Collider2D other)
    {
        JumperPlayerFollow jumper = other.GetComponent<JumperPlayerFollow>();
        Enemy enemy = other.GetComponent<Enemy>();
        if (jumper != null)
        {
            enemy.TakeDamage(_damage);
        }
    }
}
