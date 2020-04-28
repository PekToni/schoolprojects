using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ParallaxBackground : MonoBehaviour
{
    [SerializeField] Vector2 _speed = new Vector2(1, 1);
    private RawImage _image1;

    void Awake()
    {
        _image1 = GetComponent<RawImage>();
    }

    void Update()
    {
        var camera = Camera.main;
        float x = camera.transform.position.x * _speed.x;
        float y = camera.transform.position.y * _speed.y;

        _image1.uvRect = new Rect(x, y, _image1.uvRect.width, _image1.uvRect.height);
    }
}
