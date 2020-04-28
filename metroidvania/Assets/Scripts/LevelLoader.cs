using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class LevelLoader : MonoBehaviour
{
    [SerializeField]
    private GameObject _loadingScreenCanvas;

    public void LoadFirstLevel()
    {
        LoadLevelByIndex(1);
    }

    private void LoadLevelByIndex(int index)
    {
        ShowLoadingScreen();
        StartCoroutine(AsyncLoad(index));
    }

    IEnumerator AsyncLoad(int levelIndex)
    {
        var asyncOp = SceneManager.LoadSceneAsync(levelIndex);

        while (!asyncOp.isDone)
        {
            yield return 0;
        }
    }

    public void LoadCurrentLevel()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }


    public void LoadMainMenu()
    {
        LoadLevelByIndex(0);
    }

    public void QuitGame()
    {
        Debug.Log("Quit called", this);

        Application.Quit();
    }

    private void ShowLoadingScreen()
    {
        _loadingScreenCanvas.SetActive(true);
    }
}
