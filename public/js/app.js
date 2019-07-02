console.log("Client Side Js file loaded ")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const welcomeMsg = document.querySelector('p')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //makes it not reload 
    const location = search.value
 
    messageOne.textContent="Loading..."
    messageTwo.textContent=""
    messageThree.textContent=""
    //messageFour.textContent=""
    
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent=data.error
            
        }else{
            welcomeMsg.textContent=""
            messageOne.textContent=data.location
            messageTwo.textContent="Right now it's " + data.forecast.currentTemp + " degrees with an expected high/low of " + data.forecast.tempHigh +"/" + data.forecast.tempLow +"."
            if(data.forecast.rain > 65){
                messageThree.textContent = "Feel free to grab an umbrella because there's a " + data.forecast.rain + " chance of rain."
            }else{
                messageThree.textContent = "No need to grab an umbrella because there's a " + data.forecast.rain + " chance of rain."
            }
            messageFour.textContent = "Also, this is a reminder to slather on that suncreen cause there's a uv index of " + data.forecast.uv + "! (And sunscreen is ALWAYS important)"
            
        }
    })
    
})

}) 

