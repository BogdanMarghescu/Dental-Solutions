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
    date = yyyy + '-' + mm + '-' + dd;
    return date;
}

function changePrice() {
    document.getElementById("price-label").textContent = services[document.getElementById("service-select").selectedIndex].pret + " lei";
}

function checkAvailabilityDate() {
    var data_prog_string = document.getElementById("date-select").value;
    var ora_prog_string = document.getElementById("hour-select").options[document.getElementById("hour-select").selectedIndex].textContent;
    var data_split = data_prog_string.split("-");
    var data_prog = data_split[2] + "." + data_split[1] + "." + data_split[0];
    var ora = document.getElementById("hour-select").options[document.getElementById("hour-select").selectedIndex].value;
    var data_p = new Date(data_prog_string);
    if (data_p.getDay() == 6 || data_p.getDay() == 0) {
        document.getElementById("busy-label").textContent = "Nu avem program in weekend";
        document.getElementById("busy-label").setAttribute("style", "height: 38px;color: red;")
        return false;
    }
    else {
        document.getElementById("busy-label").textContent = "Disponibil";
        document.getElementById("busy-label").setAttribute("style", "height: 38px;color: green;")
        for (var i = 0; i < programari_new.length; i++) {
            if (programari_new[i].data === data_prog) {
                document.getElementById("busy-label").textContent = "Aveți deja o programare in acea zi";
                document.getElementById("busy-label").setAttribute("style", "height: 38px;color: red;")
                return false;
            }
        }
    }
}

var email = sessionStorage.getItem("email");
var user_name = sessionStorage.getItem("name");
var user_surname = sessionStorage.getItem("surname");
var passwd = sessionStorage.getItem("password");
var phone = sessionStorage.getItem("phone");
var prog_new_string = sessionStorage.getItem("programari_new");
var programari_new = JSON.parse(prog_new_string);
var services_string = sessionStorage.getItem("services");
var services = JSON.parse(services_string);
document.getElementById("date-select").setAttribute("min", getDateStringDatePicker(new Date()));
var new_date = new Date();
new_date.setMonth(new_date.getMonth() + 3);
document.getElementById("date-select").setAttribute("max", getDateStringDatePicker(new_date));
document.getElementById("price-label").textContent = services[document.getElementById("service-select").selectedIndex].pret + " lei";

function makeProgramare(form) {
    var sv = document.getElementById("service-select").options[document.getElementById("service-select").selectedIndex].textContent;
    var data_prog_string = document.getElementById("date-select").value;
    var ora_prog_string = document.getElementById("hour-select").options[document.getElementById("hour-select").selectedIndex].textContent;
    var data_split = data_prog_string.split("-");
    var data_prog = data_split[2] + "." + data_split[1] + "." + data_split[0];
    var ora = document.getElementById("hour-select").options[document.getElementById("hour-select").selectedIndex].value;
    var pret = document.getElementById("price-label").textContent.slice(0, -4);
    if (document.getElementById("busy-label").textContent != "Disponibil") {
        alert(document.getElementById("busy-label").textContent + "!");
        return false;
    }
    else if (confirm("Sigur doriți să programați pentru un serviciu de " + sv + " pe data de " + data_prog + " la ora " + ora_prog_string + " cu pretul de " + pret + " lei?")) {

        var programare = {
            "serviciu": sv,
            "data": data_prog,
            "ora": ora.toString(),
            "pret": pret
        };
        programari_new.push(programare);
        prog_new_string = JSON.stringify(programari_new);
        sessionStorage.setItem("programari_new", prog_new_string);
        window.location.replace('programari_new.html');
        return false;
    }
    else {
        window.location.replace('add_programare.html');
        return false;
    }
}