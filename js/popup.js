/**
 * @description of all file: 
 * 
 * 1. Popup window to leadhunt web.
 * 2.Clear storage button.
 * 3. Scraper for data and post to server.
 * 4. Connect to LeadHunt web with post request.
 * 5. POST method.
 */
console.log("I'm the popup.");

/**
* For @PRODCTION unmark those:
*/
// const url_leadhunt = "http://leadhunt.services/connect-extension/";
// const url_linkedin = "http://leadhunt.services/create-update-liprofile/";


/**
 *@DEVELOPMENT
 */
const url_leadhunt = "http://127.0.0.1:8000/connect-extension/";
const url_linkedin = "http://127.0.0.1:8000/create-update-liprofile/";

/**
 * 1.
 *@description popup window to leadhunt
*/
document.getElementById("popup").addEventListener("click", () => { window.open("http://18.118.199.168", "_blank"); });

/**
 * 2.
 * @description clear data button
 */
document.getElementById("clearall").addEventListener("click", () => {
  chrome.storage.local.clear(() => {
    var error = chrome.runtime.lastError;
    console.log("cleared storage.local!");
    if (error) {
      console.error(error);
    }
  });
});

/**
 * 3.
 * @description onclick Scrape linkedin, POST to server
 */
document.getElementById("linkedin").addEventListener("click", () => {
  console.log("linkedin listener worked");
  //sending message to background and receiving its content
  chrome.runtime.sendMessage(
    {
      message: "get_cookie",
    },
    (messageRes) => {
      if (messageRes.message === "success") {
        console.log("success");



        if (url_linkedin) {
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

          // postData(url_linkedin, data);
          console.log("data Linkedin ", data)
          let undefinedObject = false;
          const keys = Object.keys(data);
          keys.forEach((key, index) => {
            if (data[key] == undefined) {
              console.log("error ", data[key])
              undefinedObject = true;
            }
          });

          if (!undefinedObject) {
            postData(url_linkedin, data);

            document.getElementById("linkedin_success").innerHTML = `Success: Connected and sent profile..  `;
          }
          else
            document.getElementById("linkedin_success").innerHTML = `Failure: Try refreshing the page and then click here.. `;
        }
      }
      else{
        document.getElementById("linkedin_success").innerHTML = `Failure: Something went wrong.. `;
      }
    }
  );
});

/**
 * 4.LEADHUNT
 *@description Connect To Leadhunt, Post to the server
*/
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

        console.log("This is the object :", messageRes)

        let data = { sessionid: messageRes.sessionid };
        console.log("popup sessionid", data);

        if (data.sessionid != undefined) {
          postData(url_leadhunt, data).then((res) => {
            console.log("Response for sessionid ", res);
            chrome.storage.local.set({ unique_code: res.unique_code });
          });

          document.getElementById(
            "leadhunt_success"
          ).innerHTML = `Success: Connected and received the data.  `;
        } else
          document.getElementById(
            "leadhunt_success"
          ).innerHTML = `Failure : Try refreshing the page and then click here.. `;
      }
      else{
        document.getElementById("linkedin_success").innerHTML = `Failure: Something went wrong.. `;
      }
    }

  );
});
/**
 * 5.
 * @description POST method implementation(FETCH):
 */
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

document.getElementById("messages").addEventListener("click", () => {
  console.log("pressed")
  chrome.runtime.sendMessage({messages:"requestMessages"}, (response)=> {
    console.log(response);
  });
});
