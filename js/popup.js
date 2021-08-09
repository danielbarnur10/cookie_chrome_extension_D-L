// const login = require('./login.js')

/**
 * This file includes:
 * 1. sendMessage() sending message to background.js function with get_cookie message.
 * 2. postData() : POSTS the data from the local storage of the chrome.
 */
console.log("I'm the popup.");

//popup link to leadhunt
document.getElementById("popup").addEventListener("click", () => {
  let w = 780,
    h = 600,
    scroll = "yes";
  let winName = "popup",
    url = "http://18.119.98.104";

  LeftPosition = screen.width ? (screen.width - w) / 2 : 0;
  TopPosition = screen.height ? (screen.height - h) / 2 : 0;
  settings =
    "height=" +
    h +
    ",width=" +
    w +
    ",top=" +
    TopPosition +
    ",left=" +
    LeftPosition +
    ",scrollbars=" +
    scroll +
    ",resizable";
  window.open(url, winName, settings);
  return false;
});

//clear data button
document.getElementById("clearall").addEventListener("click", () => {
  chrome.storage.local.clear(() => {
    var error = chrome.runtime.lastError;
    console.log("cleared storage.local!");
    if (error) {
      console.error(error);
    }
  });
});

//onclick Scrape linkedin, POST to server
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

        //const url = "http://localhost:5000/api";

        // const url="http://3.21.190.163/update-liat/";//send to production

        const url = `http://127.0.0.1:8000/create-liat`; //test  ${messageRes.userHref}
        if (url) {
          // console.log("this is the object :", messageRes)

          let data = {
            JSESSIONID: messageRes.JSESSIONID,
            li_at: messageRes.li_at,
            sessionid: messageRes.sessionid,
            userName: messageRes.userName,
            userHref: messageRes.userHref,
            userImage: messageRes.userImage,
            unique_code: messageRes.unique_code,
          };

          postData(url, data);

          let undefinedObject = false;
          const keys = Object.keys(data);
          keys.forEach((key, index) => {
            if (data[key] == undefined) {
              //console.log("Im inside the loopIm inside the loopIm inside the loop",key)
              //"sessionid =vl7arvmai9tbpy77cv2c7lhainyjhu4f "
              undefinedObject = true;
            }
          });

          //if (!undefinedObject){
          //postData(url, data);

          //document.getElementById("linkedin_success").innerHTML = `connected and sent profile.. ${messageRes.message} `;
          //}
          //else
          //  document.getElementById("linkedin_success").innerHTML = `try refreshing the page and then click here.. ${messageRes.message} `;
        }
      }
    }
  );
});

//Connect To Leadhunt, Post to the server
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
        //const url = "http://localhost:5000/api";
        /**
         * posting to url:
         */
        //const url="http://3.21.190.163/create-session/";
        const url = "http://127.0.0.1:8000/create-session";

        if (url) {
           console.log("This is the object :", messageRes)

          let data = { sessionid: messageRes.sessionid };
          console.log("popup sessionid", data);
         
          if (messageRes.sessionid != undefined) {
            postData(url, data).then((res) => {
              console.log("Response for sessionid ", res);
              chrome.storage.local.set({ unique_code: res.unique_code});
            });

            document.getElementById(
              "leadhunt_success"
            ).innerHTML = `${messageRes.message}: connected and received the cookie..  `;
          } else
            document.getElementById(
              "leadhunt_success"
            ).innerHTML = `failure : try refreshing the page and then click here.. `;
        }
      }
    }
  );
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

