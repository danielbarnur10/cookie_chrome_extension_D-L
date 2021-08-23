/**
 * This file catches the information from the main page of-
 * linkedin while connected and saves the daya in the local chrome storage.
 */
if(window.location.href==="https://www.linkedin.com/feed/"){

    //href
    const userHref = document.querySelector(".scaffold-layout__sidebar")
    .querySelector(".ember-view.block").href
    /**
     * alt:
     * document.querySelector(".ember-view.block").href
     * */
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



    



