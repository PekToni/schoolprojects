using System.Collections;
using System.Collections.Generic;
using System.Security.Cryptography;
using UnityEngine;
using UnityEngine.UI;

public class RocketItem : MonoBehaviour
{
    [SerializeField] private int _rockets;
    [SerializeField] private Text _displayMessage;
    [SerializeField] private Weapon _playerWeapon;

    internal bool _pickUp;

    private ManagerForScenes _manager;

    void Start()
    {
        _manager = GameObject.Find("ManagerForScenes").GetComponent<ManagerForScenes>();
    }

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.transform.tag == "Player")
        {
            _pickUp = true;
            _manager._displayThisRocket = true;
        }
    }

    void OnTriggerExit2D(Collider2D other)
    {
        if (other.transform.tag == "Player")
        {
            _pickUp = false;
            _manager._displayThisRocket = false;
        }
    }

    void Update()
    {
        if (_pickUp && _manager._firstRocket)
        {
            Time.timeScale = 0;
            if (Input.GetKeyDown(KeyCode.Space) && _pickUp == true)
            {
                FirstPickUp();
                PickUp();
                _manager._displayThisRocket = false;
            }
        }
        else if (_pickUp && _manager._firstRocket == false)
        {
            PickUp();
        }
    }

    void FirstPickUp()
    {
        _manager._firstRocket = false;
        Time.timeScale = 1;
    }

    void PickUp()
    {
        _playerWeapon.PickRockets(_rockets);
        _manager._pickupSound = true;
        Destroy(gameObject);
    }
}
