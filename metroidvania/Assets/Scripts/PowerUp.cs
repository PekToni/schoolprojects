using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class PowerUp : MonoBehaviour
{
    [SerializeField] private int _healthUp;
    [SerializeField] private Text _displayMessage;
    [SerializeField] private PlayerHealth _playerHealth;

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
            _manager._displayThisHealth = true;
        }
    }

    void OnTriggerExit2D(Collider2D other)
    {
        if (other.transform.tag == "Player")
        {
            _pickUp = false;
            _manager._displayThisHealth = false;
        }
    }

    void Update()
    {
        if (_pickUp && _manager._firstHealth)
        {
            Time.timeScale = 0;
            if (Input.GetKeyDown(KeyCode.Space) && _pickUp == true)
            {
                _manager._firstHealth = false;
                Time.timeScale = 1;
                _manager._pickupSound = true;
                _playerHealth.TakeHealth(_healthUp);
                _manager._displayThisHealth = false;
                Destroy(gameObject);
            }
        }
        else if (_pickUp && _manager._firstHealth == false)
        {
            _manager._pickupSound = true;
            _playerHealth.TakeHealth(_healthUp);
            Destroy(gameObject);
        }
    }
}
