using System.Collections;
using System.Collections.Generic;
using System.Security.Cryptography;
using UnityEngine;

public class DestroyOverTime : MonoBehaviour
{
    [SerializeField] private float _waitTime = 5;

    private float _timer;

    void Update()
    {
        _timer += Time.deltaTime;

        if (_timer > _waitTime)
        {
            Destroy(gameObject);
        }
    }
}
