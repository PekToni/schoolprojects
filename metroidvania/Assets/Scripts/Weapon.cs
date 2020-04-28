using System.Collections;
using System.Collections.Generic;
using System.Net.Mime;
using UnityEngine;
using UnityEngine.UI;

public class Weapon : MonoBehaviour
{
    [SerializeField] private Transform _firePoint;
    [SerializeField] private GameObject _bulletForwardPrefab;
    [SerializeField] private GameObject _bulletUpPrefab;
    [SerializeField] private GameObject _rocketForwardPrefab;
    [SerializeField] private GameObject _rocketUpPrefab;
    [SerializeField] private Texture2D _rocketImage;
    [SerializeField] private Text _rocketAmount;
    [SerializeField] private GameObject _smoke;

    private Animator _anim;
    private bool _crouch = false;
    private bool _normalWeapon = true;
    private bool _rocket = false;
    private int _rockets;
    private int _maxRockets = 10;
    private Weapon _rocketsFromWeapon;

    void Start()
    {
        _anim = GetComponent<Animator>();
        _rocketsFromWeapon = GetComponent<Weapon>();
    }
    void Update()
    {
        // Check player state and change firepoint position based on that
        PlayerState();

        // Cycle weapons
        if (Input.GetKeyDown(KeyCode.X) && _rocket)
        {
            _rocket = false;
            _normalWeapon = true;
        }
        else if (Input.GetKeyDown(KeyCode.X) && _normalWeapon)
        {
            _normalWeapon = false;
            _rocket = true;
        }

        // Check if rockets, if not, change to normal weapon
        if (_rockets == 0)
        {
            _normalWeapon = true;
            _rocket = false;
        }

        // Shoot normal bullets or rockets
        if (Input.GetButtonDown("Fire1") && _normalWeapon)
        {
            Shoot();
        }
        if (Input.GetButtonDown("Fire1") && _rocket && _rockets > 0)
        {
            ShootRocket();
            _rockets -= 1;
        }
    }

    void OnGUI()
    {
        GUI.DrawTexture(new Rect(280, 10, 20, 20), _rocketImage);
        _rocketAmount.text = _rockets.ToString();
    }

    void Shoot()
    {
        if (_anim.GetBool("ShootUp"))
        {
            Instantiate(_bulletForwardPrefab, _firePoint.position, Quaternion.Euler(0, 0, 90));
        }
        else
        {
            Instantiate(_bulletForwardPrefab, _firePoint.position, _firePoint.rotation);
        }
        
    }

    void ShootRocket()
    {
        if (_anim.GetBool("ShootUp"))
        {
            
            Instantiate(_rocketForwardPrefab, _firePoint.position, Quaternion.Euler(0, 0, 90));
            Instantiate(_smoke, _firePoint.transform.position, Quaternion.Euler(0,0,90));
        }
        else
        {
            Instantiate(_rocketForwardPrefab, _firePoint.position, _firePoint.rotation);
            Instantiate(_smoke, _firePoint.transform.position, transform.rotation);
        }

    }

    void PlayerState()
    {
        if (_anim.GetBool("Crouch"))
        {
            _firePoint.localPosition = new Vector3(1.2f, -0.6f, 0f);
        }
        else if (_anim.GetBool("ShootUp"))
        {
            _firePoint.localPosition = new Vector3(0.25f, 1.3f, 0f);
        }
        else if (!_anim.GetBool("Crouch"))
        {
            _firePoint.localPosition = new Vector3(1.2f, 0.2f, 0f);
        }
    }

    public void PickRockets(int rockets)
    {
        _rockets += rockets;
        if (_rockets >= _maxRockets)
        {
            _rockets = _maxRockets;
        }
    }
}
