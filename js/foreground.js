/**
 * This file catches the information from the main page of-
 * linkedin while connected and saves the daya in the local chrome storage.
 */
if (window.location.href.match("linkedin.com")) {
    console.log("D&L Entered linkedin");
    let metaData = "",
        includedData = "",
        typePic = "";
    let array = document.querySelectorAll("code");
    array.forEach(element => {
        if (element.innerHTML.match("picture", "^comment", "^following")) {
            if (JSON.parse(element.innerHTML).included.length == 1) {
                metaData = JSON.parse(element.innerHTML);
                // console.log(metaData)
            }
        }
    });
    metaData.included.forEach(element => {
        if (JSON.stringify(element).match("firstName", "lastName", "picture", "publicIdentifier")) {
            // console.log(element)
            includedData = element;
        }
    });
    //name
    let firstName = includedData.firstName;
    let lastName = includedData.lastName;
    let fullName = firstName.concat(" ", lastName);

    //link
    let userUrl = "https://www.linkedin.com/in/".concat(includedData.publicIdentifier);

    //image
    includedData.picture.artifacts.forEach(element => {
        if (element.width == 200)
            typePic = element.fileIdentifyingUrlPathSegment

    });
    let pictureUrl = includedData.picture.rootUrl.concat(typePic);
    while (pictureUrl.match("amp;")) {
        pictureUrl = pictureUrl.replace("amp;", "");
    }
    console.log(userUrl, pictureUrl, fullName)
    //save to chrome locally
    chrome.storage.local.set({
        name: fullName
    });
    chrome.storage.local.set({
        img: pictureUrl
    });
    chrome.storage.local.set({
        link: userUrl
    });
};

// const openMessages = document.querySelector("#msg-overlay").children

// for (const child of openMessages) {
//     if (child.id.match("ember")) {
//         for(const element of child.children){
//                 if (element.className.match("msg-overlay-conversation-bubble__content-wrapper relative display-flex flex-column")){
//                         for(const msgfind of element.children){
//                             if(msgfind.className.match("msg-s-message-list-container relative display-flex mtA ember-view")){
//                                 for(const msg of msgfind.querySelectorAll(" div > ul > li")){

//                                     console.log(msg.innerText)
//                                 }
//                             }
//                         }
//                     }
//                 }
//         }
//     }

