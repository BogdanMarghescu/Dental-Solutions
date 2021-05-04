document.getElementById('admin_link').onclick = function (e) {
    var admin_pass = prompt("Introduceti parola de administrator", "");
    if (admin_pass == null || admin_pass == "") {
        e.preventDefault();
        return false;
    }
    else {
        json_pass = { parola: admin_pass };
        axios.post('http://localhost:88/admin_pass_check', json_pass).then(function (response) {
            if (response.data == 'Ati introdus o parola gresita!') {
                alert(response.data);
                e.preventDefault();
                window.location.replace('index.html');
                return false;
            }
        });
    }
}