
console.log("i'm the background")

chrome.runtime.onInstalled.addListener(() => {
    // default state goes here
    // this runs ONE TIME ONLY (unless the user reinstalls your extension)
    
    // setting state
    
        chrome.storage.local.set( {li_at: 'No cookies yet(li_at)' })
        chrome.storage.local.set( {JSESSIONID:"No cookies yet(JSESSIONID)"})
        chrome.storage.local.set( {name:"No name"})
        chrome.storage.local.set( {img:"No img"})
        chrome.storage.local.set( {link:"No link"})

    })
//test
// getting state
console.log("======================================")
chrome.storage.local.get(["li_at","JSESSIONID"], (retrieved_data) => { console.log(retrieved_data)});


//message listener sends back the info to popup or more
chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
    if (req.message === 'get_cookie') {
        chrome.storage.local.get(["li_at","JSESSIONID"], data => {
            if (chrome.runtime.lastError) {
                sendRes({
                    messsage: 'fail'
                })
                console.log('fail')
                return;
            }
            console.log("from the background object",data)
            sendRes({
                message: 'success',
                li_at: data.li_at,
                JSESSIONID: data.JSESSIONID,
                // later ill send:
                name:"",
                img:"",
                link:""
            })

        })
        return true;

    }
})
//gets the cookies li_at and JSSESION
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^http(s?)/.test(tab.url)) {
        console.log(tab.url)

        let cookies = getCookiesForURL(tab.url).then(data => {
            //iterates through the cookies and parses them
            if (Object.keys(data).length > 0) {
                let cookies = '';
                data.forEach(datum => {
                    let expiry = 0;
                    if (datum.expirationDate) {
                        expiry = parseInt(datum.expirationDate)
                    }
                    //li_at
                    if (datum['name'] == "li_at") {
                        //saves the cookie to storage
                            chrome.storage.local.set({li_at:datum['value']});
                    }   
                    //JSSESION
                    if (datum['name'] == "JSESSIONID") {
                       //saves the cookie to storage
                       chrome.storage.local.set({JSESSIONID:datum['value']});
                    }
                })

            }
            //gets the objects and shows them
            chrome.storage.local.get(["li_at", "JSESSIONID", "name", "link", "img"],(result)=> {
                console.log("result:",result )
            });
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


//parsing the cookie
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === 'complete' && /^http(s?)/.test(tab.url)) {
//         console.log(tab.url)


//         let cookies = getCookiesForURL(tab.url).then(data => {

//             if (Object.keys(data).length > 0) {
//                 let cookies = '';
//                 data.forEach(datum => {
//                     let expiry = 0;
//                     if (datum.expirationDate) {
//                         expiry = parseInt(datum.expirationDate)
//                     }
//                     if (datum['name'] == "li_at") {
//                         cookies = cookies.concat(JSON.stringify({name: datum['name'],value: datum['value']}))
//                        //saves the cookie to storage
//                         chrome.storage.local.set({key: cookies}, ()=> {
//                             console.log('Value is set to ' + cookies);
//                         });
//                     }
//                 })

//             }

//         })

//     }
// })


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