if (!("users" in sessionStorage) || !("services" in sessionStorage)) {
    axios.all([
        axios.get('http://localhost:88/admin_users'),
        axios.get('http://localhost:88/admin_services')
    ]).then(axios.spread((users, services) => {
        sessionStorage.setItem("users", JSON.stringify(users.data));
        sessionStorage.setItem("services", JSON.stringify(services.data));
    }));
}

function logIn(form) {
    var email_str = document.getElementById("email_login_form").value;
    var passwd_str = document.getElementById("password_login_form").value;
    var json_auth = {
        email: email_str,
        parola: passwd_str
    };
    axios.post('http://localhost:88/log_user', json_auth).then(function (response) {
        if ((response.data == 'Utilizatorul cu adresa de email "' + email_str + '" nu exista!') || (response.data == 'Ati introdus o parola gresita!')) {
            alert(response.data);
            window.location.replace('login.html');
        } else {
            sessionStorage.setItem("email", response.data.email);
            sessionStorage.setItem("name", response.data.prenume);
            sessionStorage.setItem("surname", response.data.nume);
            sessionStorage.setItem("password", response.data.parola);
            sessionStorage.setItem("phone", response.data.telefon);
            sessionStorage.setItem("user_id", parseInt(response.data.ID));
            json_email = { email: sessionStorage["email"] };
            axios.all([
                axios.post('http://localhost:88/programari_noi_user', json_email),
                axios.post('http://localhost:88/programari_vechi_user', json_email)
            ]).then(axios.spread((prog_new, prog_old) => {
                sessionStorage.setItem("programari_new", JSON.stringify(prog_new.data));
                sessionStorage.setItem("programari_old", JSON.stringify(prog_old.data));
                window.location.replace('index.html');
            }));
        }
    });
    return false;
}

function newUser(form) {
    var email_str = document.getElementById("email_new_user").value;
    var passwd_str = document.getElementById("passwd_new_user").value;
    var confirm_passwd_str = document.getElementById("repeat_passwd_new_user").value;
    var user_name_str = document.getElementById("name_new_user").value;
    var user_surname_str = document.getElementById("surname_new_user").value;
    var phone_str = document.getElementById("phone_new_user").value;
    if (passwd_str != confirm_passwd_str) {
        alert("Parolele nu coincid!");
    }
    else {
        var json_auth = {
            email: email_str,
            nume: user_surname_str,
            prenume: user_name_str,
            telefon: phone_str,
            parola: passwd_str
        };
        axios.post('http://localhost:88/create_user', json_auth).then(function (response) {
            if (response.data == 'Utilizatorul cu adresa de email "' + email_str + '" exista deja! Folositi o alta adresa de email!') {
                alert(response.data);
                window.location.replace('new_account.html');
            }
            else {
                sessionStorage.setItem("email", email_str);
                sessionStorage.setItem("name", user_name_str);
                sessionStorage.setItem("surname", user_surname_str);
                sessionStorage.setItem("password", response.data.parola);
                sessionStorage.setItem("phone", phone_str);
                sessionStorage.setItem("user_id", parseInt(response.data.id));
                var users_string = sessionStorage.getItem("users");
                var users = JSON.parse(users_string);
                var json_new_user = {
                    ID: sessionStorage["user_id"],
                    email: email_str,
                    nume: user_surname_str,
                    prenume: user_name_str,
                    telefon: phone_str,
                    parola: response.data.parola
                }
                users.push(json_new_user);
                users_string = JSON.stringify(users);
                sessionStorage.setItem("users", users_string);
                json_email = { email: sessionStorage["email"] };
                axios.all([
                    axios.post('http://localhost:88/programari_noi_user', json_email),
                    axios.post('http://localhost:88/programari_vechi_user', json_email)
                ]).then(axios.spread((prog_new, prog_old) => {
                    sessionStorage.setItem("programari_new", JSON.stringify(prog_new.data));
                    sessionStorage.setItem("programari_old", JSON.stringify(prog_old.data));
                    window.location.replace('index.html');
                }));
            }
        });
        return false;
    }
}

function checkUser() {
    var email = sessionStorage.getItem("email");
    if (email == null) {
        alert("Pentru a va face o programare, trebuie sa fiti logat in contul dumneavoastra!");
        if (document.getElementById('programare-link').hasAttribute("href")) {
            document.getElementById('programare-link').removeAttribute("href");
        }
        return false;
    }
}

var email = sessionStorage.getItem("email");
if (email != null) {
    document.getElementById('account_button').textContent = email;
    document.getElementById('account_button').innerHTML += '<i class="fas fa-user-circle" style="font-weight: bold;font-style: normal;margin-left: 10px;"></i>';
    document.getElementById('account_link').setAttribute("href", "profile.html");
    document.getElementById('programare-link').setAttribute("href", "add_programare.html");
}
else {
    document.getElementById('account_link').setAttribute("href", "login.html");
}