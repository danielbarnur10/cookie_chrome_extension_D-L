console.log("i'm the background")
 /*
 This file includes:
 1.Initialization of the objects - li_at, JSESSIONID, name, img, link.
 2.Message listener to "get_cookie" and sends back the objects to the popup or any of the js files that called it.
 3.A function which gets the cookies li_at and JSSESION and saves it in chrome local storage, using 4 and 5 functions
 4.getHost()
 5.getCookiesForURL()
 6.Injecting code from the background to foreground. (letting the foreground run it's script )  

 */
 

chrome.runtime.onInstalled.addListener(() => {
    // default state goes here
    // this runs ONE TIME ONLY (unless the user reinstalls your extension)
    // setting states
        chrome.storage.local.set( {li_at: undefined })
        chrome.storage.local.set( {JSESSIONID:undefined})
        chrome.storage.local.set( {name:undefined})
        chrome.storage.local.set( {img:undefined})
        chrome.storage.local.set( {link:undefined})
        chrome.storage.local.set({sessionid:undefined})
        chrome.storage.local.set({sessionCode:undefined})


    })

    
//injecting the background  and scraping the profile from homepage
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^http(s?)/.test(tab.url)) {

        // chrome.scripting.insertCSS({
        //     target: { tabId },
        //     files: ["./foreground_styles.css"]
        // // })
        //     .then(() => {
        //         console.log("INJECTED THE FORGROUND STYLES.")

                chrome.scripting.executeScript({
                    target: { tabId },
                    files: ["./js/foreground.js"]
                }).then(() => { console.log("INJECTED THE FORGROUND SCRIPT.") })
                    
            // })
            .catch(err => console.log(err))
    }
})



//message listener sends back the info to popup or more
chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
    if (req.message === 'get_cookie') {
        chrome.storage.local.get(["li_at","JSESSIONID","name","img","link","sessionid","sessionCode"], data => {
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
                payload:data,
                li_at: data.li_at,
                JSESSIONID: data.JSESSIONID,
                sessionid:data.sessionid,
                userName: data.name,
                userHref: data.link,
                userImage: data.img,
                sessionCode:data.sessionCode,
            })

        })
        return true;

    }
})

//1.
//leadhunt session cookie save 
//message listener sends back the info to popup or more
chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
    if (req.message === 'get_leadhunt') {
        chrome.storage.local.get(["sessionid"], data => {
            if (chrome.runtime.lastError) {
                sendRes({
                    messsage: 'fail'
                })
                console.log('fail')
                return;
            }
            // console.log("from the background object",data)
            sendRes({
                message: 'success',
                sessionid:data.sessionid,
            })

        })
        return true;

    }
})


//
//gets the cookies li_at and JSSESION and sessionid
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
                    //sessionid *only from leadhunt website
                    if (datum['name'] == "sessionid") {
                        //saves the cookie to storage
                        chrome.storage.local.set({sessionid:datum['value']});
                     }
                })

            }
            //gets the objects and shows them
            // chrome.storage.local.get(["li_at", "JSESSIONID", "name", "link", "img"],(result)=> {
            //     console.log("from function background result:",result )
            // });
            // chrome.storage.local.get(["sessionid"],(result)=> {
            //     console.log("from function background result sessionid:",result )
            // });
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




// //sending message to frontend
// chrome.runtime.sendMessage({
//     message: 'change_name',

// }, response => {
//     if (response.message === 'success') {
//         ce_name.innerHTML = `Hello ${response.payload}`
//     }
// })