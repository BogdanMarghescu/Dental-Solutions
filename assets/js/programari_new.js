function getDateStringDatePicker(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    date = dd + '.' + mm + '.' + yyyy;
    return date;
}

var email = sessionStorage.getItem("email");
var user_name = sessionStorage.getItem("name");
var user_surname = sessionStorage.getItem("surname");
var passwd = sessionStorage.getItem("password");
var phone = sessionStorage.getItem("phone");
var prog_new_string = sessionStorage.getItem("programari_new");
var programari_new = JSON.parse(prog_new_string);
for (var i = 0; i < programari_new.length; i++) {
    var entry = document.createElement("tr");
    var td_data = document.createElement("td");
    td_data.innerHTML = getDateStringDatePicker(new Date(programari_new[i].data)) + "\t" + programari_new[i].ora + ":00";
    var td_serv = document.createElement("td");
    td_serv.innerHTML = programari_new[i].serviciu;
    var td_pret = document.createElement("td");
    td_pret.innerHTML = programari_new[i].pret + " lei";
    var check_del = document.createElement("input");
    check_del.setAttribute("type", "checkbox");
    check_del.setAttribute("id", "check_delete_" + i);
    var td_check_del = document.createElement("td");
    td_check_del.appendChild(check_del);
    entry.appendChild(td_data);
    entry.appendChild(td_serv);
    entry.appendChild(td_pret);
    entry.appendChild(td_check_del);
    document.getElementById("table_new_prog_body").appendChild(entry);
}

function saveProgramari(form) {
    if (confirm("Sigur doriți să anulați programările selectate pentru contul cu adresa de email " + email + "?")) {
        for (var i = 0; i < programari_new.length; i++) {
            if (document.getElementById("table_new_prog_body").rows[i].cells[3].children[0].checked) {
                axios.post('http://localhost:88/programari_delete', programari_new[i]);
                document.getElementById("table_new_prog_body").deleteRow(i);
                programari_new.splice(i, 1);
                i--;
            }
        }
        prog_new_string = JSON.stringify(programari_new);
        sessionStorage.setItem("programari_new", prog_new_string);
        window.location.replace('programari_new.html');
        return false;
    }
    else {
        for (var i = 0; i < programari_new.length; i++) {
            document.getElementById("table_new_prog_body").rows[i].cells[3].children[0].checked = false;
        }
        return false;
    }
}