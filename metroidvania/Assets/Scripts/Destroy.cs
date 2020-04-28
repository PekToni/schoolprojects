using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Destroy : MonoBehaviour
{
    [SerializeField] private float _waitTime;
    private float _timer = 0.0f;

    void Update()
    {
        _timer += Time.deltaTime;
        if (_timer > _waitTime)
        {
            Destroy(gameObject);
        }
    }
}
