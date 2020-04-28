using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DeathSound : MonoBehaviour
{
    [SerializeField] private AudioClip _audio;

    private AudioSource _source;

    void Start()
    {
        _source = GetComponent<AudioSource>();
        _source.PlayOneShot(_audio, 1f);
    }

    void Update()
    {
        
    }
}
