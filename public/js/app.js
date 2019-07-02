console.log("Client Side Js file loaded ")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const welcomeMsg = document.querySelector('p')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //makes it not reload 
    const location = search.value
 
    messageOne.textContent="Loading..."
    
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent=data.error
            messageTwo.textContent=""
        }else{
            welcomeMsg.textContent=""
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        }
    })
})

})

