using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class MenutInput : MonoBehaviour
{
    [SerializeField] private EventSystem _eventSystem;
    [SerializeField] private GameObject _selectedObject;

    private bool _selectedButton;

    void Update()
    {
        if (Input.GetAxisRaw("Vertical") != 0 && _selectedButton == false)
        {
            _eventSystem.SetSelectedGameObject(_selectedObject);
            _selectedButton = true;
        }
    }

    private void OnDisable()
    {
        _selectedButton = false;
    }
}
