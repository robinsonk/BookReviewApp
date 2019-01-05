'use strict';

//Youtube API Key and endpoints
//Youtube uses %20 to connect spaces 
const youtubeApiKey= 'AIzaSyAuWUVv36LyE1npxUfX3OhWRc7n7ihYz4c';
const youtubeSearchURL = 'https://www.googleapis.com/youtube/v3/search';

//Google Books API Key and endpoint. Key is not necessary for basic info
//Google Books uses %20 to connect spaces 
const googleSearchURL = 'https://www.googleapis.com/books/v1/volumes?q=';
const googleApiKey = 'AIzaSyAuWUVv36LyE1npxUfX3OhWRc7n7ihYz4c';

function formListener() {
    console.log('The formListener function is running \nWaiting for user input...');
 //Listen for input from the form. Set up variables to store form data
    $('#submit-button').click(function(event) {
        event.preventDefault();
        $('.youtube-results').empty();
        $('.results-header').empty();
        $('.book-details').empty();
        console.log('The form has collected data');

        let titleField = $('#title').val()
        let authorField = $('#author').val()
        let title = titleField.replace(/[, ]+/g, '%20');
        let author = authorField.replace(/[, ]+/g, '%20');
        console.log(`The user wants to see reviews of ${titleField} by ${authorField}.`);

        $('.results-header').append(`
        <h2>Showing results for ${titleField} ${authorField}</h2>
        `);

        youtubeApiCall(title, author);
        googleBooksApiCall(title, author);
    })
}

//Pulling basic book info from Google Books API for info section --------------------------------------------------------------------------

function googleBooksApiCall(title, author) {
    console.log('The googleBooksApiCall function is running...');
    console.log(`${googleSearchURL}${title}%20${author}`);
 //Pulls data from Google Books API
    fetch(`${googleSearchURL}${title}%20${author}`)
    .then(response => response.json())
    .then(responseJson2 =>
        displayBookData(responseJson2))
        .catch(error => alert('something went wrong'));
}

function displayBookData(responseJson2) {
    console.log('The displayBookData function is running...')
    console.log(responseJson2);
 //Display general book information for user's search
    $('.book-details').append(`
    <img src="${responseJson2.items[0].volumeInfo.imageLinks.thumbnail}" alt="${responseJson2.items[0].volumeInfo.title} cover photo">
    <h2>Title: ${responseJson2.items[0].volumeInfo.title}</h2>
    <h3>Author: ${responseJson2.items[0].volumeInfo.authors}</h3>
    <h4>Genre: ${responseJson2.items[0].volumeInfo.categories}</h4>
    <p>Blurb: ${responseJson2.items[0].volumeInfo.description}</p><br><br><br>
    `);    
}


//Gathering and displaying Review Results from YT and GB --------------------------------------------------------------------------------------

function youtubeApiCall(title, author) {
    console.log('The youtubeApiCall function is running...')
    console.log(`${youtubeSearchURL}?key=${youtubeApiKey}&q=book%20review%20${title}%20${author}&part=snippet&maxResults=3&type=video`);
 //Fetch info from the api, based on form data
    fetch(`${youtubeSearchURL}?key=${youtubeApiKey}&q=book%20review%20${title}%20${author}&part=snippet&maxResults=3&type=video`)
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
    <iframe id="ytplayer" type="text/html" width="640" height="360"
        src="https://www.youtube.com/embed/${responseJson.items[i].id.videoId}?autoplay=1"
        frameborder="0">
    </iframe>
    <h3>${responseJson.items[i].snippet.title}</h3>
    <p>${responseJson.items[i].snippet.description}</p><br><br><br>
    `);
    //Display embedded YT video
}

function runApp() {
    console.log('The Book Review App is running');
 //Run the app on page load
    formListener();

}

$(runApp);