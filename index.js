'use strict';

const apiKey= 'AIzaSyAuWUVv36LyE1npxUfX3OhWRc7n7ihYz4c';
const searchURL = 'https://www.googleapis.com/youtube/v3/search'

function formListener() {
    console.log('The formListener function is running \nWaiting for user input...');
 //Listen for input from the form. Set up variables to store form data
    $('#submit-button').click(function(event) {
        event.preventDefault();
        $('.youtube-results').empty();
        $('.results-header').empty();
        console.log('The form has collected data');

        let titleField = $('#title').val()
        let authorField = $('#author').val()
        let title = titleField.replace(/[, ]+/g, '%20');
        let author = authorField.replace(/[, ]+/g, '%20');
        console.log(`The user wants to see reviews of ${titleField} by ${authorField}.`);

        $('.results-header').append(`
        <h2>Showing results for ${titleField} ${authorField}</h2>
        `);

        apiCall(title, author);
    })
}

function apiCall(title, author) {
    console.log('The apiCall function is running...')
    console.log(`${searchURL}?key=${apiKey}&q=book%20review%20${title}%20${author}&part=snippet&maxResults=3&type=video`);
 //Fetch info from the api, based on form data
    fetch(`${searchURL}?key=${apiKey}&q=book%20review%20${title}%20${author}&part=snippet&maxResults=3&type=video`)
    .then(response => response.json())
    .then(responseJson =>
        displayResults(responseJson))
        .catch(error => alert('something went wrong'));
}

function displayResults(responseJson) {
    console.log('The displayResults function is running...')
    console.log(responseJson);
 //Display the results from the apiCall function and display them in the DOM
    for (let i = 0; i < responseJson.items.length; i++)
    $('.youtube-results').append(`
    <img src="${responseJson.items[i].snippet.thumbnails.medium.url}" alt="video snippet">
    <h3>${responseJson.items[i].snippet.title}</h3>
    <p>${responseJson.items[i].snippet.description}</p><br><br><br>
    `);
}

function runApp() {
    console.log('The Book Review App is running');
 //Run the app on page load
    formListener();

}

$(runApp);