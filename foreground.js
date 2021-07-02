// document.querySelector("body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img").style.transitionDuration = '2.0s'
// document.querySelector("body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img").style.transform = 'rotate(1000deg)'
const ce_main_container = document.createElement('DIV');
const ce_name = document.createElement('div');
const ce_input = document.createElement('INPUT');
const ce_button = document.createElement('DIV');



ce_main_container.classList.add('ce_main');
ce_name.id = 'ce_name';
ce_input.id = 'ce_input';
ce_button.id = 'ce_button';

ce_name.innerHTML = `Hello NAME`;
ce_button.innerHTML = `Change name`;


ce_main_container.appendChild(ce_name);
ce_main_container.appendChild(ce_input);
ce_main_container.appendChild(ce_button);

document.querySelector('body').appendChild(ce_main_container)



chrome.runtime.sendMessage({
    message: 'get_name',

}, response => {
    if (response.message === 'success') {
        ce_name.innerHTML = `Hello ${response.payload}`
    }
})


chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
    if (req.message === 'change_name') {
        ce_name.innerHTML = `Hello ${req.payload}`;
    }
})


chrome.storage.local.get(['key'], function(result) {
    console.log('Value currently is ' + result.key);
  });