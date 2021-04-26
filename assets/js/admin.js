document.getElementById('admin_link').onclick = function (e) {
    var admin_pass = prompt("Introduceti parola de administrator", "");
    if (admin_pass == null || admin_pass == "") {
        e.preventDefault();
        return false;
    }
    else if (admin_pass != "admindentist") {
        alert("Parola gresita!");
        e.preventDefault();
        return false;
    }
}