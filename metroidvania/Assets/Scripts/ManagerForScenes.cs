using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ManagerForScenes : MonoBehaviour
{
    [SerializeField] private ManagerForScenes _instanceMan = null;
    [SerializeField] private AudioClip[] _clips = new AudioClip[2];
    [SerializeField] private Text _displayMessage;
    [SerializeField] private Texture2D _healthBlock;
    [SerializeField] private Texture2D _rocketBlock;
    [SerializeField] private GameObject _panel;

    internal bool _firstRocket = true;
    internal bool _firstHealth = true;
    internal bool _pickupSound = false;
    internal bool _displayThisHealth = false;
    internal bool _displayThisRocket = false;

    private AudioSource _source;
    private float _timer;
    private float _waitTime = 10;
    

    void Awake()
    {
       if (!_instanceMan == null)
        {
        Destroy(gameObject);
        }
        else

        {
            _instanceMan = this;
        }
    }
    

    void Start()
    {
        _source = GetComponent<AudioSource>();
    }

    void Update()
    {
        if (_pickupSound == true)
        {
            _source.clip = _clips[0];
            _source.Play();
            _pickupSound = false;
        }
    }

    void OnGUI()
    {
        if (_displayThisHealth)
        {
            _timer += Time.deltaTime;
            _displayMessage.text = "You picked one block      of health... Press space to exit.";
            GUI.DrawTexture(new Rect(800, 240, 20, 20), _healthBlock);
            _panel.SetActive(true);
            if (Input.GetKeyDown(KeyCode.Space))
            {
                _displayMessage.text = "";
                _panel.SetActive(false);
                _displayThisHealth = false;
            }
            // Disable message after 10 secs
            if (_timer > _waitTime)
            {
                _displayMessage.text = "";
                _panel.SetActive(false);
                _displayThisHealth = false;
            }
        }

        if (_displayThisRocket)
        {
            _timer += Time.deltaTime;
            _displayMessage.text =
                "You just picket up rockets,       you can now use rocketlauncher... cycle weapons with button X. Press Space to exit.";
            GUI.DrawTexture(new Rect(807, 195, 20, 20), _rocketBlock);
            _panel.SetActive(true);
            if (Input.GetKeyDown(KeyCode.Space))
            {
                _displayMessage.text = "";
                _panel.SetActive(false);
                _displayThisRocket = false;
            }
            // Disable message after 10 secs
            if (_timer > _waitTime)
            {
                _displayMessage.text = "";
                _panel.SetActive(false);
                _displayThisHealth = false;
            }
        }
    }
}
