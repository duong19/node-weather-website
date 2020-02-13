// const geocode = require('./utils/geocode')
// const forecast = require('./utils/weather')

console.log('Loaded js')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#mess-1')
const messageTwo = document.querySelector('#mess-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''

    const location = search.value
    console.log(location)

    fetch('/weather?location=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.forecast
                messageTwo.textContent = data.location
            }
        })
    })
})