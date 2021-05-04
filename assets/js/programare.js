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

function makeDate(date, hour) {
    date.setHours(date.getHours() + hour);
    return date;
}

function changePrice() {
    document.getElementById("price-label").textContent = services[document.getElementById("service-select").selectedIndex].pret + " lei";
}

function checkAvailabilityHour() {
    var data_prog_string = document.getElementById("date-select").value;
    var ora = parseInt(document.getElementById("hour-select").options[document.getElementById("hour-select").selectedIndex].value);
    var data_prog = makeDate(new Date(data_prog_string), ora);
    json_data_prog = { data_progamare: data_prog };
    if ((document.getElementById("busy-label").textContent != "Nu avem program în weekend") && (document.getElementById("busy-label").textContent != "Aveți deja o programare în acea zi")) {
        axios.post('http://localhost:88/check_prog_datetime', json_data_prog).then(function (response) {
            document.getElementById("busy-label").textContent = response.data;
            if (response.data == "Disponibil") {
                document.getElementById("busy-label").setAttribute("style", "height: 38px;color: green;")
            } else {
                document.getElementById("busy-label").setAttribute("style", "height: 38px;color: red;")
            }
        });
    }
}

function checkAvailabilityDate() {
    var data_prog = new Date(document.getElementById("date-select").value);
    if (data_prog.getDay() == 6 || data_prog.getDay() == 0) {
        document.getElementById("busy-label").textContent = "Nu avem program în weekend";
        document.getElementById("busy-label").setAttribute("style", "height: 38px;color: red;")
        return false;
    } else if (programari_new.findIndex(programare => programare.data == data_prog.toJSON()) > -1) {
        document.getElementById("busy-label").textContent = "Aveți deja o programare în acea zi";
        document.getElementById("busy-label").setAttribute("style", "height: 38px;color: red;")
        return false;
    } else {
        document.getElementById("busy-label").textContent = "Disponibil";
        checkAvailabilityHour();
    }
}

var email = sessionStorage.getItem("email");
var user_name = sessionStorage.getItem("name");
var user_surname = sessionStorage.getItem("surname");
var passwd = sessionStorage.getItem("password");
var phone = sessionStorage.getItem("phone");
var user_id = sessionStorage.getItem("user_id");
var prog_new_string = sessionStorage.getItem("programari_new");
var programari_new = JSON.parse(prog_new_string);
var services_string = sessionStorage.getItem("services");
var services = JSON.parse(services_string);
var new_date = new Date();
new_date.setDate(new_date.getDate() + 1);
document.getElementById("date-select").value = getDateStringDatePicker(new_date);
document.getElementById("date-select").setAttribute("min", getDateStringDatePicker(new_date));
new_date.setMonth(new_date.getMonth() + 3);
document.getElementById("date-select").setAttribute("max", getDateStringDatePicker(new_date));
document.getElementById("price-label").textContent = services[document.getElementById("service-select").selectedIndex].pret + " lei";
checkAvailabilityDate()

function makeProgramare(form) {
    var sv = document.getElementById("service-select").options[document.getElementById("service-select").selectedIndex].textContent;
    var data_prog_string = document.getElementById("date-select").value;
    var ora_prog_string = document.getElementById("hour-select").options[document.getElementById("hour-select").selectedIndex].textContent;
    var data_split = data_prog_string.split("-");
    var data_prog = data_split[2] + "." + data_split[1] + "." + data_split[0];
    var ora = parseInt(document.getElementById("hour-select").options[document.getElementById("hour-select").selectedIndex].value);
    var pret_val = parseInt(document.getElementById("price-label").textContent.slice(0, -4));
    if (document.getElementById("busy-label").textContent != "Disponibil") {
        alert(document.getElementById("busy-label").textContent + "!");
        return false;
    }
    else if (confirm("Sigur doriți să vă programați pentru un serviciu de " + sv + " pe data de " + data_prog + " la ora " + ora_prog_string + " cu pretul de " + pret_val.toString() + " lei?")) {
        var id_serviciu = document.getElementById("hour-select").selectedIndex;
        var data_prog_for_insert = makeDate(new Date(data_prog_string), ora)
        var json_programare = {
            ID_Serviciu: id_serviciu,
            ID_Utilizator: user_id,
            data_programare: data_prog_for_insert.toJSON()
        };
        axios.post('http://localhost:88/add_prog', json_programare).then(function (response) {
            var programare = {
                ID: parseInt(response.data),
                data: new Date(data_prog_string).toJSON(),
                ora: ora,
                pret: pret_val,
                serviciu: sv
            };
            programari_new.push(programare);
            prog_new_string = JSON.stringify(programari_new);
            sessionStorage.setItem("programari_new", prog_new_string);
            window.location.replace('programari_new.html');
            return false;
        });
    }
    else {
        window.location.replace('add_programare.html');
        return false;
    }
}