var users_string = sessionStorage.getItem("users");
var services_string = sessionStorage.getItem("services");
var users = JSON.parse(users_string);
var services = JSON.parse(services_string);

for (var i = 0; i < users.length; i++) {
    var entry = document.createElement("tr");
    var td_email = document.createElement("td");
    var email_input = document.createElement("input");
    email_input.setAttribute("type", "email");
    email_input.setAttribute("class", "form-control");
    email_input.value = users[i].email;
    td_email.appendChild(email_input);

    var td_nume = document.createElement("td");
    var nume_input = document.createElement("input");
    nume_input.setAttribute("type", "text");
    nume_input.setAttribute("class", "form-control");
    nume_input.value = users[i].nume;
    td_nume.appendChild(nume_input);

    var td_prenume = document.createElement("td");
    var prenume_input = document.createElement("input");
    prenume_input.setAttribute("type", "text");
    prenume_input.setAttribute("class", "form-control");
    prenume_input.value = users[i].prenume;
    td_prenume.appendChild(prenume_input);

    var td_telefon = document.createElement("td");
    var telefon_input = document.createElement("input");
    telefon_input.setAttribute("type", "tel");
    telefon_input.setAttribute("class", "form-control");
    telefon_input.value = users[i].telefon;
    td_telefon.appendChild(telefon_input);

    var td_parola = document.createElement("td");
    var parola_input = document.createElement("input");
    parola_input.setAttribute("type", "text");
    parola_input.setAttribute("class", "form-control");
    parola_input.value = users[i].parola;
    td_parola.appendChild(parola_input);

    var check_del = document.createElement("input");
    check_del.setAttribute("type", "checkbox");
    var td_check_del = document.createElement("td");
    td_check_del.appendChild(check_del);

    entry.appendChild(td_email);
    entry.appendChild(td_nume);
    entry.appendChild(td_prenume);
    entry.appendChild(td_telefon);
    entry.appendChild(td_parola);
    entry.appendChild(td_check_del);
    document.getElementById("table_users_body").appendChild(entry);
}

for (var i = 0; i < services.length; i++) {
    var entry = document.createElement("tr");
    var td_serviciu = document.createElement("td");
    td_serviciu.innerHTML = services[i].tip;

    var td_pret = document.createElement("td");
    td_pret.setAttribute("style", "width: 120px;");
    var pret_input = document.createElement("input");
    pret_input.setAttribute("type", "number");
    pret_input.setAttribute("class", "form-control");
    pret_input.setAttribute("min", "10");
    pret_input.setAttribute("max", "2000");
    pret_input.setAttribute("style", "text-align: center;");
    pret_input.required = true;
    pret_input.value = services[i].pret;
    td_pret.appendChild(pret_input);

    entry.appendChild(td_serviciu);
    entry.appendChild(td_pret);
    document.getElementById("table_services_body").appendChild(entry);
}

function saveUsersAdmin(form) {
    if (confirm("Sigur salvați schimbările efectuate?")) {
        for (var i = 0; i < users.length; i++) {
            users[i].email = document.getElementById("table_users_body").rows[i].cells[0].children[0].value;
            users[i].nume = document.getElementById("table_users_body").rows[i].cells[1].children[0].value;
            users[i].prenume = document.getElementById("table_users_body").rows[i].cells[2].children[0].value;
            users[i].telefon = document.getElementById("table_users_body").rows[i].cells[3].children[0].value;
            users[i].parola = document.getElementById("table_users_body").rows[i].cells[4].children[0].value;
            if (document.getElementById("table_users_body").rows[i].cells[5].children[0].checked) {
                document.getElementById("table_users_body").deleteRow(i);
                users.splice(i, 1);
                i--;
            }
        }
        users_string = JSON.stringify(users);
        sessionStorage.setItem("users", users_string);
        window.location.replace('admin.html');
        return false;
    }
    else {
        for (var i = 0; i < users.length; i++) {
            document.getElementById("table_users_body").rows[i].cells[0].children[0].value = users[i].email;
            document.getElementById("table_users_body").rows[i].cells[1].children[0].value = users[i].nume;
            document.getElementById("table_users_body").rows[i].cells[2].children[0].value = users[i].prenume;
            document.getElementById("table_users_body").rows[i].cells[3].children[0].value = users[i].telefon;
            document.getElementById("table_users_body").rows[i].cells[4].children[0].value = users[i].parola;
            document.getElementById("table_users_body").rows[i].cells[5].children[0].checked = false;
        }
        return false;
    }
}

function saveServicesAdmin(form) {
    if (confirm("Sigur salvați prețurile schimbate?")) {
        for (var i = 0; i < services.length; i++) {
            services[i].pret = document.getElementById("table_services_body").rows[i].cells[1].children[0].value;
        }
        services_string = JSON.stringify(services);
        sessionStorage.setItem("services", services_string);
        window.location.replace('admin.html');
        return false;
    }
    else {
        for (var i = 0; i < services.length; i++) {
            document.getElementById("table_services_body").rows[i].cells[1].children[0].value = services[i].pret;
        }
        return false;
    }
}