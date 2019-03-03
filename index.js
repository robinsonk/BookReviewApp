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
        $('.arrow').fadeIn(3000);
        console.log('The form has collected data');

        let titleField = $('#title').val();
        let title = titleField.replace(/[, ]+/g, '%20');
        console.log(`The user wants to see reviews of ${titleField}.`);

        //Checking to see if the search form is submitted without any input
        if (!document.getElementById("title").value) {
            $('.results-header').append(`
                <h2>Please enter a valid book title or author and try again.</h2>
                `);
        }

        else {
            youtubeApiCall(title);
            googleBooksApiCall(title);
            $('.results-header').append(`
            <h2>Reviews for ${titleField}</h2>
            `);
        }
    
    })
}

//Pulling basic book info from Google Books API for info section --------------------------------------------------------------------------

function googleBooksApiCall(title) {
    console.log('The googleBooksApiCall function is running...');
    console.log(`${googleSearchURL}${title}`);
 //Pulls data from Google Books API
    fetch(`${googleSearchURL}${title}`)
    .then(response => response.json())
    .then(responseJson2 =>
        displayBookData(responseJson2))
        .catch(error => alert('something went wrong'));
}


function displayBookData(responseJson2) {
    console.log('The displayBookData function is running...')
    console.log(responseJson2);
 //Display general book information for user's search

    if (responseJson2.totalItems === 0) {
        $('.results-header').empty();
        $('.results-header').append(`
                <h2>Please enter a valid book title or author and try again.</h2>
                `);
    }

    $('.book-details').append(`
    <div class="book-info">
        <img class="cover-photo" src="${responseJson2.items[0].volumeInfo.imageLinks.thumbnail}" alt="${responseJson2.items[0].volumeInfo.title} cover photo">
        <h2 class="book-title"><span class="title-2">${responseJson2.items[0].volumeInfo.title}</span></b>
        by: ${responseJson2.items[0].volumeInfo.authors} <br><br>  <span class="blurb">
        ${responseJson2.items[0].searchInfo.textSnippet}</span></h2>
    

        
    
    
    <div class="more-details">
        <h4 class="info-title">Publish Date: ${responseJson2.items[0].volumeInfo.publishedDate}</h4>
        <h4 class="info-title">Page Count: ${responseJson2.items[0].volumeInfo.pageCount}</h4>
        <h4 class="info-title">Publisher: ${responseJson2.items[0].volumeInfo.publisher}</h4>
        <h4 class="info-title">Genre: ${responseJson2.items[0].volumeInfo.categories}</h4>
        <h4 class="info-title">Google Books Rating: ${responseJson2.items[0].volumeInfo.averageRating}/5</h4>
        <h4><a target="_blank" href="${responseJson2.items[0].volumeInfo.previewLink}">Preview the book on Google Books</a></h4>
        <h4><a target="_blank" href="${responseJson2.items[0].saleInfo.buyLink}">Purchase on Google Books</a></h4>
    </div>
    </div>
    
    `); 
}


//Gathering and displaying Review Results from YT and GB --------------------------------------------------------------------------------------

function youtubeApiCall(title) {
    console.log('The youtubeApiCall function is running...')
    console.log(`${youtubeSearchURL}?key=${youtubeApiKey}&q=book%20review%20${title}&part=snippet&maxResults=10&type=video`);
 //Fetch info from the api, based on form data
    fetch(`${youtubeSearchURL}?key=${youtubeApiKey}&q=book%20review%20${title}&part=snippet&maxResults=10&type=video`)
    .then(response => response.json())
    .then(responseJson =>
        displayResults(responseJson))
        .catch(error => alert('something went wrong'));
}

function displayResults(responseJson) {
    console.log('The displayResults function is running...')
    console.log(responseJson);
 // Display results header
 //Display the results from the youtubeapiCall function and display them in the DOM
    for (let i = 0; i < responseJson.items.length; i++)
    $('.youtube-results').append(`
    <div class="videos">
        <iframe id="ytplayer" type="text/html" 
            src="https://www.youtube.com/embed/${responseJson.items[i].id.videoId}?autoplay=0"
            frameborder="0">
        </iframe>
        <div class="video-details">
            <h3>${responseJson.items[i].snippet.title}</h3>
            <h4><a href="https://www.youtube.com/channel/${responseJson.items[i].snippet.channelId}">${responseJson.items[i].snippet.channelTitle}</a></h4>
            <p>${responseJson.items[i].snippet.description}</p>
            <p><a href="https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}">SEE MORE</a></p>
        </div>
        <hr>
    </div>
    `);
}

function runApp() {
    console.log('The Book Review App is running');
 //Run the app on page load
    formListener();
    $('.arrow').hide();
}

$(runApp);