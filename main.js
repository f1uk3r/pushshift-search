let searchedArray = []
let apiUrlForSubmissions = "https://api.pushshift.io/reddit/search/submission/?size=10000&sort=desc&sort_type=score&filter=selftext,title,num_comments,score,url,author,created_utc"
let apiUrlForComments = "https://api.pushshift.io/reddit/search/comment/?size=10000&sort=desc&sort_type=score&filter=body,score,permalink,author,created_utc"
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
        apiUrlForSubmissions += "&q=" + searchTerm;
        apiUrlForComments += "&q=" + searchTerm;
    }
    if (subreddit.length !== 0) {
        apiUrlForSubmissions += "&subreddit=" + subreddit;
        apiUrlForComments += "&subreddit=" + subreddit;
    }
    if (user.length !== 0) {
        apiUrlForSubmissions += "&author=" + user;
        apiUrlForComments += "&author=" + user;
    }
    requestApi(apiUrlForSubmissions)
    /*Http.onreadystatechange=(e)=>{
        let responseObject = Http.response
        console.log(responseObject)
        console.log(responseData)
    }*/
}

function requestApi(url) {
    const Http = new XMLHttpRequest()
    Http.open("GET", url)
    Http.responseType = 'json'
    Http.send()
    Http.onload = function ()  {
        let status = Http.status
        if (status === 200) {
            let responseObject = Http.response
            let responseData = responseObject["data"]
            showResponse(responseData)
        }
    }
}

function showResponse(data) {
    
}