var email = sessionStorage.getItem("email");
var user_name = sessionStorage.getItem("name");
var user_surname = sessionStorage.getItem("surname");
var passwd = sessionStorage.getItem("password");
var phone = sessionStorage.getItem("phone");

document.getElementById('profile_paragraph_email').textContent = email;
document.getElementById('profile_paragraph_name').textContent = user_name;
document.getElementById('profile_paragraph_surname').textContent = user_surname;
document.getElementById('profile_paragraph_phone').textContent = phone;

function logout() {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("surname");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("phone");
    sessionStorage.removeItem("programari_new");
    sessionStorage.removeItem("programari_old");    
}