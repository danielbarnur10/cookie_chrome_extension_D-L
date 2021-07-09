console.log("I'm the options.")
chrome.runtime.sendMessage({
    message:'get_name',

},response=>{
    if(response.message === 'success'){
        console.log('success')

        document.querySelector('div').innerHTML= `Hello ${response.payload}`
    }
})