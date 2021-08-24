/**
 * This file catches the information from the main page of-
 * linkedin while connected and saves the daya in the local chrome storage.
 */
if (window.location.href.match("linkedin.com")) {
    console.log("linkedin")
    let metaData = ""
    let array = document.querySelectorAll("code")
    array.forEach(element => {  
        if (element.innerHTML.match("picture", "^comment", "^following", )) {

            metaData = element.innerHTML
        }

    });
    jsonMetaData = JSON.parse(metaData)
    //name
    let firstName = jsonMetaData.included[0].firstName
    let lastName = jsonMetaData.included[0].lastName
    let fullName = firstName.concat(" ", lastName)
    //link
    let userUrl = "https://www.linkedin.com/in/".concat(jsonMetaData.included[0].publicIdentifier)
    //image
    let pictureUrl = jsonMetaData.included[0].picture.rootUrl.concat(jsonMetaData.included[0].picture.artifacts[1].fileIdentifyingUrlPathSegment)
    while (pictureUrl.match("amp;"))
        pictureUrl = pictureUrl.replace("amp;", "")


    chrome.storage.local.set({
        name: fullName
    })
    chrome.storage.local.set({
        img: pictureUrl
    })
    chrome.storage.local.set({
        link: userUrl
    })
}
/*
        if(window.location.href==="https://www.linkedin.com/feed/"){
            
    //href
    const userHref = document.querySelector(".scaffold-layout__sidebar")
    .querySelector(".ember-view.block").href
    /**
     * alt:
     * document.querySelector(".ember-view.block").href
     * */
/*
    //image
    const userImage = document.querySelector(".feed-identity-module__member-photo.profile-rail-card__member-photo.EntityPhoto-circle-5.lazy-image.ember-view")
    .src
    //name
    const userName = document.querySelector(".profile-rail-card__actor-link.t-16.t-black.t-bold")
    .innerText
    
    console.log(userName,userImage, userHref)
    
    chrome.storage.local.set( {name:userName})
    chrome.storage.local.set( {img:userImage})
    chrome.storage.local.set( {link:userHref})
}
else{
    
    //name
    const userHref =  window.location.href
    
    //img
    const userImage = document.querySelector(".profile-photo-edit__edit-btn >img").src
    
    //link
    const userName = document.querySelector(".profile-photo-edit__edit-btn >img").alt
    
    console.log(userName,userImage, userHref)
    
    chrome.storage.local.set( {name:userName})
    chrome.storage.local.set( {img:userImage})
    chrome.storage.local.set( {link:userHref})
}

*/