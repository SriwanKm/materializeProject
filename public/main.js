const output = document.getElementById("op")
const submit = document.querySelector('#submit');
let currentId = 1;


document.querySelector('#next')?.addEventListener('click', function () {

    currentId++;
    loadPage();
})
document.querySelector('#prev')?.addEventListener('click', function () {
    if (currentId >= 1) {
        currentId--;
        loadPage();
    }
})

if (document.querySelector('#inquiry') != null) {
    document.querySelector('#inquiry').addEventListener('submit', function (e) {
        e.preventDefault();
        let name = document.querySelector('input[name="name"]')
        let email = document.querySelector('input[name="email"]')
        const message = document.getElementById('message');
        let date = document.querySelector('input[name="date"]')


        let checkedValue = document.querySelectorAll('input[class=cb]:checked');
        let animals = Array.prototype.map.call(checkedValue, el => el.value).join(", ")

        let data = 'name=' + name.value + '&email=' + email.value + '&message=' + message.value + '&date=' + date.value + '&animalType=' + animals;

        const xhr = new XMLHttpRequest();
        if (name.value && email.value && date.value) {
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                }
            }
            console.log(name.value)
            console.log(email.value)
            console.log(message.value)
            console.log(date.value)

            xhr.open('POST', 'http://localhost:3000/posts', true)
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            xhr.send(data)


            name.value = null
            email.value = null
            message.value = null
            date.value = null
            $('input[type=checkbox]').prop('checked',false)
            alert("Inquiry submitted")
        }
    })
}

document.querySelector('#search')?.addEventListener('click', function () {
    output.innerHTML = ''
    let search = document.querySelector('textarea[name="search"]').value;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            let myObj = JSON.parse(xhr.response);
            console.log(myObj)
            for (let x = 0; x < myObj.length; x++) {
                output.innerHTML += `
                        <div class="card blue-grey darken-1">
                              <div class="card-content white-text">
                                <table>
                                     <tr>
                                        <td><b>ID</b></td>
                                        <td>${myObj[x].id}</td>
                                     </tr>
                                     <tr>
                                        <td><b>Name</b></td>
                                        <td>${myObj[x].name}</td>
                                     </tr>
                                     <tr>
                                        <td><b>Email</b></td>
                                        <td>${myObj[x].email}</td>
                                     </tr>
                                     <tr>
                                        <td><b>Service required</b></td>
                                        <td>${myObj[x].message}</td>
                                     </tr>
                                     <tr>
                                        <td><b>Schedule Date</b></td>
                                        <td>${myObj[x].date}</td>
                                     </tr>
                                     <tr>
                                        <td><b>Animal Type</b></td>
                                        <td>${myObj[x].animalType}</td>
                                     </tr>
                                </table>
                              </div>
                        </div>`;
                console.log(output);
            }
        }
    }
    xhr.open('GET', 'http://localhost:3000/posts?q=' + search, true)
    xhr.send()
})

function loadPage() {

    const xhr = new XMLHttpRequest();
    output.innerHTML = ''
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            let myObj = JSON.parse(xhr.response);
            for (let x = 0; x < myObj.length; x++) {
                output.innerHTML += `
                        <div class="card blue-grey darken-1 center">
                            <div class="card-content white-text center">
                                <table>
                                     <tr>
                                        <td><b>ID</b></td>
                                        <td>${myObj[x].id}</td>
                                     </tr>
                                     <tr>
                                        <td>Name</td>
                                        <td>${myObj[x].name}</td>
                                     </tr>
                                     <tr>
                                        <td>Email</td>
                                        <td>${myObj[x].email}</td>
                                     </tr>
                                     <tr>
                                        <td>Service required</td>
                                        <td>${myObj[x].message}</td>
                                     </tr>
                                     <tr>
                                        <td>Schedule Date</td>
                                        <td>${myObj[x].date}</td>
                                     </tr>
                                     <tr>
                                        <td><b>Animal Type</b></td>
                                        <td>${myObj[x].animalType}</td>
                                     </tr>
                                </table>
                            </div>
                        </div>`;
                console.log(output);
            }
        }
    }
    xhr.open('GET', 'http://localhost:3000/posts?id=' + currentId, true)
    xhr.send()
}

