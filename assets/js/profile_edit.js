var email = sessionStorage.getItem("email");
var user_name = sessionStorage.getItem("name");
var user_surname = sessionStorage.getItem("surname");
var passwd = sessionStorage.getItem("password");
var phone = sessionStorage.getItem("phone");

document.getElementById('profile_edit_email').value = email;
document.getElementById('profile_edit_name').value = user_name;
document.getElementById('profile_edit_surname').value = user_surname;
document.getElementById('profile_edit_phone').value = phone;

function enableEditEmail() {
    if (document.getElementById("check_edit_email").checked == false) {
        document.getElementById('profile_edit_email').value = email;
    }
    document.getElementById('profile_edit_email').readOnly = 1 - document.getElementById("check_edit_email").checked;
}

function enableEditName() {
    if (document.getElementById("check_edit_name").checked == false) {
        document.getElementById('profile_edit_name').value = user_name;
    }
    document.getElementById('profile_edit_name').readOnly = 1 - document.getElementById("check_edit_name").checked;
}

function enableEditSurname() {
    if (document.getElementById("check_edit_surname").checked == false) {
        document.getElementById('profile_edit_surname').value = user_surname;
    }
    document.getElementById('profile_edit_surname').readOnly = 1 - document.getElementById("check_edit_surname").checked;
}

function enableEditPhone() {
    if (document.getElementById("check_edit_phone").checked == false) {
        document.getElementById('profile_edit_phone').value = phone;
    }
    document.getElementById('profile_edit_phone').readOnly = 1 - document.getElementById("check_edit_phone").checked;
}

function editUser(form) {
    if (confirm("Sigur doriți să schimbați datele pentru contul cu adresa de email " + email + "?")) {
        var new_email = document.getElementById("profile_edit_email").value;
        var new_user_name = document.getElementById("profile_edit_name").value;
        var new_user_surname = document.getElementById("profile_edit_surname").value;
        var new_phone = document.getElementById("profile_edit_phone").value;
        sessionStorage.setItem("email", new_email);
        sessionStorage.setItem("name", new_user_name);
        sessionStorage.setItem("surname", new_user_surname);
        sessionStorage.setItem("phone", new_phone);
        window.location.replace('profile.html');
        return false;
    }
    else {
        document.getElementById('profile_edit_email').value = email;
        document.getElementById('profile_edit_email').readOnly = true;
        document.getElementById('profile_edit_name').value = user_name;
        document.getElementById('profile_edit_name').readOnly = true;
        document.getElementById('profile_edit_surname').value = user_surname;
        document.getElementById('profile_edit_surname').readOnly = true;
        document.getElementById('profile_edit_phone').value = phone;
        document.getElementById('profile_edit_phone').readOnly = true;
        document.getElementById("check_edit_email").checked = false;
        document.getElementById("check_edit_name").checked = false;
        document.getElementById("check_edit_surname").checked = false;
        document.getElementById("check_edit_phone").checked = false;
        return false;
    }
}

function changePassword(form) {
    var old_passwd = document.getElementById("edit_passwd_old").value;
    var new_passwd = document.getElementById("edit_passwd_new").value;
    var confirm_new_passwd = document.getElementById("edit_passwd_repeat").value;
    if (old_passwd != passwd) {
        alert("Ați scris greșit parola cea veche!");
        return false;
    }
    else if (new_passwd != confirm_new_passwd) {
        alert("Parolele nu coincid!");
        return false;
    }
    else if (new_passwd == passwd) {
        alert("Nu puteți sa setați o parolă folosită anterior!");
        return false;
    }
    else if (confirm("Sigur doriți să schimbați parola pentru contul cu adresa de email " + email + "?")) {
        sessionStorage.setItem("password", new_passwd);
        alert("Ați schimbat parola pentru contul cu adresa de email " + email + ".");
        window.location.replace('profile.html');
        return false;
    }
    else {
        document.getElementById("edit_passwd_old").value = '';
        document.getElementById("edit_passwd_new").value = '';
        document.getElementById("edit_passwd_repeat").value = '';
        return false;
    }
}