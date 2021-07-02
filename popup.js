console.log("I'm the popup.")

// const request = require('request');
// const updateClient=(postData)=>{
//   const clientServerOptions = {
//     uri:'http://localhost:5000/api',
//     body:JSON.stringify(postData),
//     method:'POST',
//     headers:{'Content-Type': 'application/json'}
//   }
//   request(clientServerOptions,(err, res)=>{
//     console.log(err,res.body);
//     return;
//   });
// }

//sending message to background and recieving its content
chrome.runtime.sendMessage({
  message:'get_cookie',

},response=>{
  if(response.message === 'success'){
      console.log('success')

      // updateClient(response.payload)

      document.querySelector('div').innerHTML= `The cookie is: ${response.payload} `
  }
})

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

