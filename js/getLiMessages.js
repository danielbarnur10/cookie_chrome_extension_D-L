var conversation = []
var openMessages = document.querySelector("#msg-overlay").children

for (const child of openMessages) {
    if (child.id.match("ember")) {
        for (const element of child.children) {
            if (element.className.match("msg-overlay-conversation-bubble__content-wrapper relative display-flex flex-column")) {
                for (const msgfind of element.children) {
                    if (msgfind.className.match("msg-s-message-list-container relative display-flex mtA ember-view")) {
                        const msgArray = []
                        for (const msg of msgfind.querySelectorAll(" div > ul > li")) {
                            try {
                                console.log(msg.querySelector("a").href)
                                msgArray.push(msg.querySelector("a").href)
                                console.log(msg.innerText)
                                msgArray.push(msg.innerText)
                            } catch {}
                        }
                        conversation.push(msgArray)
                        console.log("\n\n\n\n\n\n\n")
                    }
                }
            }
        }
    }
}

chrome.storage.local.set({
    conversation
}, () => console.log(conversation));