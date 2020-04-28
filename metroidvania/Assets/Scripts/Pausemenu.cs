using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Pausemenu : MonoBehaviour
{
    [SerializeField] private GameObject _pauseMenuPanel;
    private bool IsPaused => _pauseMenuPanel.activeSelf;
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            if (IsPaused)
            {
                ExitPause();
            }
            else
            {
                EnterPause();
            }
        }
    }

    public void EnterPause()
    {
        _pauseMenuPanel.SetActive(true);
        Time.timeScale = 0;
    }

    public void ExitPause()
    {
        _pauseMenuPanel.SetActive(false);
        Time.timeScale = 1;
    }
}
