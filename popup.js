
console.log("I'm the popup.")



//sending message to background and recieving its content
chrome.runtime.sendMessage({
  message: 'get_cookie',
}, messageRes => {
  if (messageRes.message === 'success') {
    console.log('success')
    let url = "http://localhost:5000/api"
    //posting to url:
    // let url="http://3.21.190.163/update-liat/";
    if (url) {
      console.log("this is the object :", messageRes)
      let data = { JSESSIONID:messageRes.JSESSIONID, li_at: messageRes.li_at }
      postData(url, data)

        document.querySelector('div').innerHTML = `The cookie is: <p>${messageRes.message} `
    }
  }
})



// Example POST method implementation:
const postData = async (url = '', data = {}) => {
  // Default options are marked with *
  console.log("data check on the POST", data)
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}



//get value from storage
// chrome.storage.local.get(['key'], function(result) {

//     console.log('Value currently is ' + result.key);
//     document.querySelector('div').innerHTML= `Hello the cookies is: ${response.key} `
//   });




//sent message to background and recieved content from background
// chrome.runtime.sendMessage({
//     message:'get_name',

// },response=>{
//     if(response.message === 'success'){
//         console.log('success')

//         document.querySelector('div').innerHTML= `The cookie is: ${response.payload} `
//     }
// })

