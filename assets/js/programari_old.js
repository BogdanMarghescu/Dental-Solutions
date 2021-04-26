var email = sessionStorage.getItem("email");
var user_name = sessionStorage.getItem("name");
var user_surname = sessionStorage.getItem("surname");
var passwd = sessionStorage.getItem("password");
var phone = sessionStorage.getItem("phone");
var prog_old_string = sessionStorage.getItem("programari_old");
var programari_old = JSON.parse(prog_old_string);
for (var i = 0; i < programari_old.length; i++) {
    var entry = document.createElement("tr");
    var td_data = document.createElement("td");
    td_data.innerHTML = programari_old[i].data + "\t" + programari_old[i].ora + ":00";
    var td_serv = document.createElement("td");
    td_serv.innerHTML = programari_old[i].serviciu;
    var td_pret = document.createElement("td");
    td_pret.innerHTML = programari_old[i].pret + " lei";
    entry.appendChild(td_data);
    entry.appendChild(td_serv);
    entry.appendChild(td_pret);
    document.getElementById("table_old_prog_body").appendChild(entry);
}

function logout() {
    sessionStorage.clear();
}