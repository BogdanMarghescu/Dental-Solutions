if (!("users" in sessionStorage)) {
    var users_string = `[
        {
            "email": "bogdan.marghescu99@gmail.com",
            "nume": "Marghescu",
            "prenume": "Bogdan",
            "telefon": "0799151041",
            "parola": "optimus99"
        },
        {
            "email": "georgepopescu84@gmail.com",
            "nume": "Popescu",
            "prenume": "George",
            "telefon": "0755691457",
            "parola": "parola123"
        },
        {
            "email": "visanadrian@gmail.com",
            "nume": "Visan",
            "prenume": "Adrian",
            "telefon": "0732557801",
            "parola": "abracadabra"
        }
    ]`;
    sessionStorage.setItem("users", users_string);
}

if (!("services" in sessionStorage)) {
    var services_string = `[
        {
            "tip": "Profilaxie carie dentară",
            "pret": "150"
        },
        {
            "tip": "Endodontie",
            "pret": "450"
        },
        {
            "tip": "Proteză Dentară",
            "pret": "700"
        },
        {
            "tip": "Parodontologie",
            "pret": "500"
        },
        {
            "tip": "Implant Dentar",
            "pret": "600"
        },
        {
            "tip": "Igienizare",
            "pret": "100"
        },
        {
            "tip": "Cosmetică dentară",
            "pret": "350"
        },
        {
            "tip": "Albire dentară",
            "pret": "300"
        },
        {
            "tip": "Radiologie Dentară",
            "pret": "40"
        }
    ]`
    sessionStorage.setItem("services", services_string);
}

function logIn(form) {
    var email = document.getElementById("email_login_form").value;
    var passwd = document.getElementById("password_login_form").value;
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("password", passwd);
    prog_new_string = `[
        {
            "serviciu": "Igienizare",
            "data": "26.04.2021",
            "ora": "10",
            "pret": "100"
        },
        {
            "serviciu": "Cosmetica dentara",
            "data": "03.06.2021",
            "ora": "15",
            "pret": "350"
        },
        {
            "serviciu": "Albire dentara",
            "data": "22.06.2021",
            "ora": "13",
            "pret": "300"
        }
    ]`;
    prog_old_string = `[
        {
            "serviciu": "Radiologie Dentara",
            "data": "18.02.2020",
            "ora": "15",
            "pret": "40"
        },
        {
            "serviciu": "Igienizare",
            "data": "05.03.2020",
            "ora": "11",
            "pret": "100"
        },
        {
            "serviciu": "Implant Dentar",
            "data": "22.03.2020",
            "ora": "9",
            "pret": "600"
        }
    ]`;
    sessionStorage.setItem("programari_new", prog_new_string);
    sessionStorage.setItem("programari_old", prog_old_string);
    window.location.replace('index.html');
    return false;
}

function newUser(form) {
    var email = document.getElementById("email_new_user").value;
    var passwd = document.getElementById("passwd_new_user").value;
    var confirm_passwd = document.getElementById("repeat_passwd_new_user").value;
    var user_name = document.getElementById("name_new_user").value;
    var user_surname = document.getElementById("surname_new_user").value;
    var phone = document.getElementById("phone_new_user").value;
    if (passwd != confirm_passwd) {
        alert("Parolele nu coincid!");
    }
    else {
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("name", user_name);
        sessionStorage.setItem("surname", user_surname);
        sessionStorage.setItem("password", passwd);
        sessionStorage.setItem("phone", phone);
        prog_new_string = `[
            {
                "serviciu": "Igienizare",
                "data": "26.04.2021",
                "ora": "10",
                "pret": "100"
            },
            {
                "serviciu": "Cosmetica dentara",
                "data": "03.06.2021",
                "ora": "15",
                "pret": "350"
            },
            {
                "serviciu": "Albire dentara",
                "data": "22.06.2021",
                "ora": "13",
                "pret": "300"
            }
        ]`;
        prog_old_string = `[
            {
                "serviciu": "Radiologie Dentara",
                "data": "18.02.2020",
                "ora": "15",
                "pret": "40"
            },
            {
                "serviciu": "Igienizare",
                "data": "05.03.2020",
                "ora": "11",
                "pret": "100"
            },
            {
                "serviciu": "Implant Dentar",
                "data": "22.03.2020",
                "ora": "9",
                "pret": "600"
            }
        ]`;
        sessionStorage.setItem("programari_new", prog_new_string);
        sessionStorage.setItem("programari_old", prog_old_string);
        window.location.replace('index.html');
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