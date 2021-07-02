
console.log("i'm the background")

chrome.runtime.onInstalled.addListener(() => {
    // default state goes here
    // this runs ONE TIME ONLY (unless the user reinstalls your extension)
    
    // setting state
    chrome.storage.local.set({
        key: 'no cookies yet(li_at)' 
    })
});


//test
// getting state
chrome.storage.local.get("key", (retrieved_data) => { console.log(retrieved_data.key)});


//message listener and changes the name
chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
    if (req.message === 'get_cookie') {
        chrome.storage.local.get('key', data => {
            if (chrome.runtime.lastError) {
                sendRes({
                    messsage: 'fail'
                })
                console.log('fail')
                return;
            }
          
            sendRes({
                message: 'success',
                payload: data.key
            })

        })
        return true;

    }
})




  




chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^http(s?)/.test(tab.url)) {
        console.log(tab.url)


        let cookies = getCookiesForURL(tab.url).then(data => {

            if (Object.keys(data).length > 0) {
                let cookies = '';
                data.forEach(datum => {
                    let expiry = 0;
                    if (datum.expirationDate) {
                        expiry = parseInt(datum.expirationDate)
                    }
                    if (datum['name'] == "li_at") {
                        cookies = cookies.concat(`"`, datum['name'], "=", datum['value'], `"`)
                       //saves the cookie to storage
                        chrome.storage.local.set({key: cookies}, ()=> {
                            console.log('Value is set to ' + cookies);
                        });
                    }
                })

            }

        })

    }
})


let getHost = param => {
    if (param.toString().match(/http(s?):\/\//)) {
        let url = new URL(param);
        url = url.host.replace('www.', '');
        if (url.split('.').length > 2) {
            let splits = url.split('.');
            splits.shift();
            return splits.join('.');
        }
        return url;
    }
}

let getCookiesForURL = url => {
    return new Promise(resolve => {
        chrome.cookies.getAll({}, (cookies) => {
            resolve(cookies.filter(cookie => cookie.domain.indexOf(getHost(url)) !== -1));
        });
    });
};


// //injecting the background 
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === 'complete' && /^http(s?)/.test(tab.url)) {

//         chrome.scripting.insertCSS({
//             target: { tabId },
//             files: ["./foreground_styles.css"]
//         })
//             .then(() => {
//                 console.log("INJECTED THE FORGROUND STYLES.")

//                 chrome.scripting.executeScript({
//                     target: { tabId },
//                     files: ["./foreground.js"]
//                 }).then(() => { console.log("INJECTED THE FORGROUND SCRIPT.") })
                    
//             })
//             .catch(err => console.log(err))
//     }
// })


// //sending message to frontend
// chrome.runtime.sendMessage({
//     message: 'change_name',

// }, response => {
//     if (response.message === 'success') {
//         ce_name.innerHTML = `Hello ${response.payload}`
//     }
// })