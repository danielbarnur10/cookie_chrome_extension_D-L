
console.log("I'm the popup.")



//sending message to background and recieving its content
chrome.runtime.sendMessage({
  message:'get_cookie',

},messageRes=>{
  if(messageRes.message === 'success'){
    console.log('success')

      //posting to url:
      let url="http://localhost:5004/api";
      if(url){
        
        let cookie=JSON.parse(messageRes.payload)
        // console.log(messageRes.payload)
        postData(url, {cookie: cookie.value})
      }
      let cookie=JSON.parse(messageRes.payload)
      document.querySelector('div').innerHTML= `The cookie is: <p>${cookie.name} =</p> ${cookie.value} `
  }
})



// Example POST method implementation:
const postData = async (url = '', data = {})=> {
  // Default options are marked with *
  console.log("data check on the POST",data)
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

