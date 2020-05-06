import './styles/base.css';
import './styles/form.css';

const scanBtn = document.getElementById('scan');
const settingsFrom = document.getElementById('settings');
const wifiDatalist = document.getElementById('wifi');
const notifications = document.getElementById('notifications');

const saveForm = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = [...formData.entries()].reduce((accum, value) => {
    accum[value[0]] = value[1];
    return accum
  }, {});
  fetch('./settings', {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(res => {
    if(res.ok) {
      notifications.classList.add('success');
      notifications.innerText = "Settings have been saved! You can close this page";
    } else {
      notifications.classList.add('error');
      notifications.innerText = "There was an error, hit the reset button and try again";
    }
  })
}

const scanWifi = () => fetch('/scan').then(res => res.json()).then(json => {
  const options = json.map(wifi => {
    return `<option value="${wifi.ssid}">`
  });
  wifiDatalist.insertAdjacentHTML('afterbegin', options.join(''));
});

document.addEventListener("DOMContentLoaded", () => {
  scanWifi();
});
scanBtn.addEventListener('click', (e) => {
  e.preventDefault();
  wifiDatalist.innerHTML('');
  scanWifi();
});
settingsFrom.addEventListener('submit', saveForm);