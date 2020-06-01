let searchedArray = []
let apiUrlForSubmissions = "https://api.pushshift.io/reddit/search/submission/?"
let apiUrlForComments = "https://api.pushshift.io/reddit/search/comment/?"
const form = document.querySelector('form')
form.addEventListener('submit', event => {
    event.preventDefault();
    apiUrlBuilder();
})

function apiUrlBuilder() {
    let searchTerm = document.querySelector('#search-term').value
    let subreddit = document.querySelector('#subreddit').value
    let user = document.querySelector('#user').value
    if (searchTerm.length !== 0) {
        apiUrlForSubmissions += "q=" + searchTerm;
        apiUrlForComments += "q=" + searchTerm;
        if (subreddit.length !== 0) {
            apiUrlForSubmissions += "&subreddit=" + subreddit;
            apiUrlForComments += "&subreddit=" + subreddit;
        }
        if (user.length !== 0) {
            apiUrlForSubmissions += "&author=" + user;
            apiUrlForComments += "&author=" + user;
        }

    } else {
        if (subreddit.length !== 0) {
            apiUrlForSubmissions += "subreddit=" + subreddit;
            apiUrlForComments += "subreddit=" + subreddit;
            if (user.length !== 0) {
                apiUrlForSubmissions += "&author=" + user;
                apiUrlForComments += "&author=" + user;
            }
        } else {
            if (user.length !== 0) {
                apiUrlForSubmissions += "author=" + user;
                apiUrlForComments += "author=" + user;
            }
        }
    }
    const Http = new XMLHttpRequest()
    Http.open("GET", apiUrlForSubmissions)
    Http.send()
    Http.onreadystatechange=(e)=>{
        console.log(Http.responseText)
    }
    /* let aBook = new Book(title, author, pages, read)
    myLibrary.push(aBook)
    let tableBody = document.querySelector('tBody');
    tableBody.innerHTML = ''
    render() */
}