let searchedArray = []
let apiUrlForSubmissions = "https://api.pushshift.io/reddit/search/submission/?size=10000&sort=desc&sort_type=created_utc&filter=selftext,title,num_comments,score,url,author,created_utc"
let apiUrlForComments = "https://api.pushshift.io/reddit/search/comment/?size=10000&sort=desc&sort_type=created_utc&filter=body,score,permalink,author,created_utc"
const form = document.querySelector('form')
let postButton = document.querySelector('.post-button')
let commentButton = document.querySelector('.comment-button')



postButton.addEventListener('click', event => {
    event.preventDefault()
    apiSubmissionUrlBuilder()
})
commentButton.addEventListener('click', event => {
    event.preventDefault()
    apiCommentUrlBuilder()
})


function apiCommentUrlBuilder() {
    let searchTerm = document.querySelector('#search-term').value
    let subreddit = document.querySelector('#subreddit').value
    let user = document.querySelector('#user').value
    if (searchTerm.length !== 0) {
        apiUrlForComments += "&q=" + searchTerm;
    }
    if (subreddit.length !== 0) {
        apiUrlForComments += "&subreddit=" + subreddit;
    }
    if (user.length !== 0) {
        apiUrlForComments += "&author=" + user;
    }
    requestApi(apiUrlForComments, "comment")
}

function apiSubmissionUrlBuilder() {
    let searchTerm = document.querySelector('#search-term').value
    let subreddit = document.querySelector('#subreddit').value
    let user = document.querySelector('#user').value
    if (searchTerm.length !== 0) {
        apiUrlForSubmissions += "&q=" + searchTerm;
    }
    if (subreddit.length !== 0) {
        apiUrlForSubmissions += "&subreddit=" + subreddit;
    }
    if (user.length !== 0) {
        apiUrlForSubmissions += "&author=" + user;
    }
    requestApi(apiUrlForSubmissions, "submission")
}

function requestApi(url, postOrComment) {
    const Http = new XMLHttpRequest()
    Http.open("GET", url)
    Http.responseType = 'json'
    Http.send()
    Http.onload = function ()  {
        let status = Http.status
        if (status === 200) {
            let responseObject = Http.response
            let responseData = responseObject["data"]
            showResponse(responseData, postOrComment)
        }
    }
}

function showResponse(data, postOrComment) {
    let resultDiv = document.querySelector('.result')
    resultDiv.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        // Source to convert unix time https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
        let date = new Date(data[i]['created_utc'] * 1000)
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        let year = date.getFullYear()
        let month = months[date.getMonth()]
        let day = date.getDate()
        let hour = date.getHours()
        let min = date.getMinutes()
        let sec = date.getSeconds()
        let time = day + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec

        let singleResultDiv = document.createElement('div')
        singleResultDiv.className = "resultBox"
        if (postOrComment === "comment") {
            let linkBox = document.createElement('a')
            linkBox.href = "https://www.reddit.com/" + data[i]['permalink']
            let authorLink = document.createElement('a')
            authorLink.href = "https://old.reddit.com/user/" + data[i]['author']
            let authorText = document.createTextNode(data[i]['author'])
            authorLink.className = "username"
            authorLink.appendChild(authorText)
            linkBox.appendChild(authorLink)
            let titleP = document.createElement('p')
            let titleText = document.createTextNode(data[i]['score'] + " points  " + time)
            titleP.appendChild(titleText)
            linkBox.appendChild(titleP)
            let bodyP = document.createElement('p')
            let bodyText = document.createTextNode(data[i]['body'])
            bodyP.appendChild(bodyText)
            linkBox.appendChild(bodyP)
            singleResultDiv.appendChild(linkBox)
            resultDiv.appendChild(singleResultDiv)
        }
        else  {
            let linkBox = document.createElement('a')
            linkBox.href = "https://www.reddit.com/" + data[i]['url']
            let authorLink = document.createElement('a')
            authorLink.href = "https://old.reddit.com/user/" + data[i]['author']
            let authorText = document.createTextNode(data[i]['author'])
            authorLink.className = "username"
            authorLink.appendChild(authorText)
            linkBox.appendChild(authorLink)
            let infoP = document.createElement('p')
            let infoText = document.createTextNode(data[i]['score'] + " points  " + time)
            infoP.appendChild(infoText)
            linkBox.appendChild(infoP)
            let titleP = document.createElement('p')
            titleP.className = "submission-title"
            let titleText = document.createTextNode("Title: " + data[i]['title'])
            titleP.appendChild(titleText)
            linkBox.appendChild(titleP)
            let bodyP = document.createElement('p')
            let bodyText = document.createTextNode(data[i]['selftext'])
            bodyP.appendChild(bodyText)
            linkBox.appendChild(bodyP)
            singleResultDiv.appendChild(linkBox)
            resultDiv.appendChild(singleResultDiv)
        }
    }
}