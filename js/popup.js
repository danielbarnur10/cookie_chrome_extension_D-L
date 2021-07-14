// const login = require('./login.js')

/**
 * This file includes:
 * 1. sendMessage() sending message to background.js function with get_cookie message.
 * 2. postData() : POSTS the data from the local storage of the chrome.
 */
console.log("I'm the popup.");
document.getElementById("popup").addEventListener("click", () => {
  let w=780, h=600, scroll= 'yes' ;
  let winName="popup", url="http://18.119.98.104";

  LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;
  TopPosition = (screen.height) ? (screen.height-h)/2 : 0;
  settings =
  'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable'
  window.open(url,winName,settings)
  return false;
 })
function popup(url){
  
  window.open(url,'popup','width=600,height=600'); 
  }

document.getElementById("clearall").addEventListener("click", () => {
chrome.storage.local.clear(()=> {
  var error = chrome.runtime.lastError;
  console.log("cleared storage.local!")
  if (error) {
      console.error(error);
  }
});
});

//onclick do this function linkedin
document.getElementById("linkedin").addEventListener("click", () => {
  console.log("linkedin listener worked");
  //sending message to background and recieving its content
  chrome.runtime.sendMessage(
    {
      message: "get_cookie",
    },
    (messageRes) => {
      if (messageRes.message === "success") {
        console.log("success");
        const url = "http://localhost:5000/api";
        //posting to url:
        // const url="http://3.21.190.163/update-liat/";
        if (url) {
          // console.log("this is the object :", messageRes)

          let data = {
            JSESSIONID: messageRes.JSESSIONID,
            li_at: messageRes.li_at,
            sessionid:messageRes.sessionid,
            userName: messageRes.userName,
            userHref: messageRes.userHref,
            userImage: messageRes.userImage,
          };
          console.log("popup get_cookie payload data",data)
          console.log("im the ", messageRes)
          console.log("im the ",)
          console.log("im the ",)
          let undefinedObject = false;
          const  keys =  Object.keys(data);
          keys.forEach((key, index) => {
               if(data[key] == undefined){
                //console.log("Im inside the loopIm inside the loopIm inside the loop",key)
                //"sessionid =vl7arvmai9tbpy77cv2c7lhainyjhu4f "
                undefinedObject =true }
              });
          if (!undefinedObject){
            postData(url, data);

            document.getElementById("linkedin_success").innerHTML = `connected and sent profile.. ${messageRes.message} `;
          }
            else 
                document.getElementById("linkedin_success").innerHTML = `try refreshing the page and then click here.. ${messageRes.message} `;
        }
      }

    }
  );
});

//onclick do this function leadhunt
document.getElementById("leadhunt").addEventListener("click", () => {
  //on click get sessionid cookie
  //leadhunt session cookie
  //sending message to background and recieving its content


  chrome.runtime.sendMessage(
    {
      message: "get_leadhunt",
    },
    (messageRes) => {
      if (messageRes.message === "success") {
        console.log("success");
        const url = "http://localhost:5000/api";
        //posting to url:
        // const url="http://3.21.190.163/update-liat/";
        if (url) {
          // console.log("this is the object :", messageRes)

          let data = { sessionid: messageRes.sessionid };
          console.log("popup sessionid", data);
          if (messageRes.sessionid != undefined){
            // postData(url, data);
            document.getElementById("leadhunt_success").innerHTML = `connected and received cookie.. ${messageRes.message} `;
          }
            else 
              document.getElementById("leadhunt_success").innerHTML = `try refreshing the page and then click here.. ${messageRes.message} `;
            
        }
        
      }
    } );
  });
// POST method implementation:
const postData = async (url = "", data = {}) => {
  // Default options are marked with *
  console.log("data check on the POST", data);
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
};

//get value from storage
// chrome.storage.local.get(['key'], function(result) {

//     console.log('Value currently is ' + result.key);
//     document.querySelector('div').innerHTML= `Hello the cookies is: ${response.key} `
//   });

// //sent message to background and recieved content from background
// chrome.runtime.sendMessage({
//     message:'get_name',

// },response=>{
//     if(response.message === 'success'){
//         console.log('success')

//         document.querySelector('div').innerHTML= `The cookie is: ${response.payload} `
//     }
// })
