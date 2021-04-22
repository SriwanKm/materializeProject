
display.addEventListener('click', function (){
    sendRequest('https://localhost:3000/posts', 'Get', {})
})

function sendRequest(url, requestType, data){
    let xhr = new XMLHttpRequest()
    if (xhr.readyState === 4){
        console.log(JSON.parse(xhr.response))
    }
    xhr.open(requestType, url, true)
    xhr.send(data)
}

