
const openMessages = document.querySelector("#msg-overlay").children

for (const child of openMessages) {
    if (child.id.match("ember")) {
        for(const element of child.children){
                if (element.className.match("msg-overlay-conversation-bubble__content-wrapper relative display-flex flex-column")){
                        for(const msgfind of element.children){
                            if(msgfind.className.match("msg-s-message-list-container relative display-flex mtA ember-view")){
                                for(const msg of msgfind.querySelectorAll(" div > ul > li")){

                                    console.log(msg.innerText)
                                }
                            }
                        }
                    }
                }
        }
    }

