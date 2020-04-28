using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class LevelEnd : MonoBehaviour
{
    [SerializeField] private Text _endingText;
    [SerializeField] private GameObject _endingPanel;
    private bool IsPaused => _endingPanel.activeSelf;
    private GameObject _playerInstance;

    private void Start()
    {
        _playerInstance = GameObject.FindGameObjectWithTag("Player");
    }

    void Update()
    {
        if (_playerInstance == null)
        {
            WhenDead();
            Time.timeScale = 1;
        }
    }

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.gameObject.tag == "Player")
        {
            EnterEnding();
            _endingText.text = "Congratulations, you have beat the game.";
        }
    }

    public void WhenDead()
    {
        EnterEnding();
        _endingText.text = "You died...";
    }

    public void EnterEnding()
    {
        _endingPanel.SetActive(true);
        Time.timeScale = 0;
    }

    public void ExitEnding()
    {
        _endingPanel.SetActive(false);
        Time.timeScale = 1;
    }
}
