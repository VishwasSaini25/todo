let user = [];  //user details array
let flag = false;
let updateIndex = null;  //check if array is already have value or not
let oldDetails = localStorage.getItem('userName');
if (oldDetails != null) user = JSON.parse(oldDetails)
const addUser = document.getElementById('addUser');
const userName = document.getElementById('input-name');
const details = document.getElementById('details');
getDetails();
//adding user button functionality
addUser.onclick = () => {
    const name = userName.value;
    if (flag && updateIndex != null) {
        user.splice(updateIndex, 1, { 'userName': name });
        updateIndex = null;
    } else user.push({ 'userName': name });
    console.log(user);
    addDetails(user);
    userName.value = "";
    addUser.innerText = "Add User";
}
// show details on screen
function getDetails() {
    let information = '';
    user.map((value, index) => {
        information += ` 
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${value.userName}</td>
        <td>
            <i id="edit" onClick="updateDetails(${index})"  class="fa fa-edit" style="font-size:20px"></i>
            <i id="delete" onClick="deleteDetails(${index})" class="fa fa-trash-o" style="font-size:20px"></i>
        </td>
        </tr>`
    });
    details.innerHTML = information;
}
//add details
function addDetails(user) {
    let userString = JSON.stringify(user);
    localStorage.setItem('userName', userString);
    getDetails();
}
//update details
function updateDetails(index) {
    flag = true;
    updateIndex = index;
    userName.value = user[index].userName;
    addUser.innerHTML = "update"
}
//delete details
function deleteDetails(index) {
    user.splice(index, 1);
    addDetails(user);
    getDetails();
    window.location.reload();
}
//search functionality
const search = document.querySelector('#search');
const allNames = document.querySelectorAll('#details tr');

search.addEventListener('input', function (e) {
    const value = e.target.value.toLowerCase();
    searchDetails(value);
    //    if(value) getDetails();

});
function searchDetails(value) {
    details.innerHTML = '';
    allNames.forEach(name => {
        const yourName = name.querySelectorAll('td');
        if (yourName[0].innerText.toLowerCase().indexOf(value) > -1) {
            details.appendChild(name);
        }
    });

    if (details.innerHTML == '') {
        details.innerHTML = ' No Records Found';
    }
}