const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const port = process.env.PORT;
var connection = mysql.createConnection({
    multipleStatements: true,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MySQL Connected...")
    }
})

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/admin_users', function (request, response) {
    connection.query('select * from utilizatori', function (error, results) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            response.send(results);
        }
    });
});

app.get('/admin_services', function (request, response) {
    connection.query('select * from tip_serviciu', function (error, results) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            response.send(results);
        }
    });
});

app.post('/admin_pass_check', function (request, response) {
    var query_check_admin_pass = "SELECT * FROM `administrator` LIMIT 1";
    connection.query(query_check_admin_pass, function (error, results) {
        if (error) {
            console.log(error);
            response.status(400).send('Error in database operation');
        } else {
            var result = bcrypt.compareSync(request.body.parola, results[0].parola);
            if (result == true) {
                var resp = 'OK';
            } else {
                var resp = 'Ati introdus o parola gresita!';
            }
            response.send(resp);
        }
    });
});

app.post('/admin_users_edit', function (request, response) {
    var query_edit_profile = "UPDATE `utilizatori` SET email = '" + request.body.email + "', nume = '" + request.body.nume + "', prenume = '" + request.body.prenume + "', telefon = '" + request.body.telefon + "', parola = '" + request.body.parola + "' WHERE ID = " + request.body.ID + ";";
    connection.query(query_edit_profile, function (error, results) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            console.log(results.affectedRows + " record(s) updated");
        }
    });
})

app.post('/admin_users_delete', function (request, response) {
    var query_services = "DELETE FROM `utilizatori` WHERE ID = " + request.body.ID + ";";
    connection.query(query_services, function (error, results) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            console.log(results.affectedRows + " record(s) updated");
        }
    });
});

app.post('/admin_services_update', function (request, response) {
    var query_services = "UPDATE `tip_serviciu` SET pret = " + request.body.pret + " WHERE ID = " + request.body.ID + ";";
    connection.query(query_services, function (error, results) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            console.log(results.affectedRows + " record(s) updated");
        }
    });
});

app.post('/create_user', async (request, response) => {
    var query_check_user = "SELECT * FROM `utilizatori` WHERE email = '" + request.body.email + "'";
    connection.query(query_check_user, function (error, results) {
        if (error) {
            console.log(error);
            response.status(400).send('Error in database operation');
        } else {
            if (results.length == 0) {
                bcrypt.hash(request.body.parola, 10, (err, hash) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    var query_insert_user = "ALTER TABLE `utilizatori` AUTO_INCREMENT=1; INSERT INTO `utilizatori` (`email`, `nume`, `prenume`, `telefon`, `parola`) VALUES ('" + request.body.email + "', '" + request.body.nume + "', '" + request.body.prenume + "', '" + request.body.telefon + "', '" + hash + "');";
                    connection.query(query_insert_user, function (error, results_insert) {
                        if (error) {
                            console.log(error);
                            response.status(400).send('Error in database operation');
                        } else {
                            results_insert.forEach(res => {
                                console.log(res.affectedRows + " record(s) updated");
                            })
                            json_auth = {
                                id: results_insert[1].insertId,
                                parola: hash
                            };
                            response.json(json_auth);
                        }
                    });
                })
            }
            else {
                var resp = 'Utilizatorul cu adresa de email "' + request.body.email + '" exista deja! Folositi o alta adresa de email!';
                console.log(resp);
                response.send(resp);
            }
        }
    });
});

app.post('/log_user', function (request, response) {
    var query_check_user = "SELECT * FROM `utilizatori` WHERE email = '" + request.body.email + "'";
    connection.query(query_check_user, function (error, results) {
        if (error) {
            console.log(error);
            response.status(400).send('Error in database operation');
        } else {
            if (results.length == 0) {
                var resp = 'Utilizatorul cu adresa de email "' + request.body.email + '" nu exista!';
                console.log(resp);
                response.send(resp);
            }
            else {
                bcrypt.compare(request.body.parola, results[0].parola, (err, res) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    if (res == true) {
                        response.send(results[0]);
                    } else {
                        var resp = 'Ati introdus o parola gresita!';
                        console.log(resp);
                        response.send(resp);
                    }
                })
            }
        }
    });
});

app.post('/edit_user', function (request, response) {
    var query_edit_profile = "UPDATE `utilizatori` SET email = '" + request.body.email + "', nume = '" + request.body.nume + "', prenume = '" + request.body.prenume + "', telefon = '" + request.body.telefon + "' WHERE ID = " + request.body.ID + ";";
    connection.query(query_edit_profile, function (error, results) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            console.log(results.affectedRows + " record(s) updated");
        }
    });
})

app.post('/change_password_check', function (request, response) {
    bcrypt.compare(request.body.old_password, request.body.current_password, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        if (res == false) {
            var resp = "Ați scris greșit parola cea veche!";
            console.log(resp);
        } else if (request.body.new_password != request.body.confirm_new_password) {
            var resp = "Parolele nu coincid!";
            console.log(resp);
        } else if (request.body.new_password == request.body.old_password) {
            var resp = "Nu puteți să setați o parolă folosită anterior!";
            console.log(resp);
        } else {
            var resp = "OK";
        }
        response.send(resp);
    });
})

app.post('/change_password', function (request, response) {
    bcrypt.hash(request.body.parola, 10, (err, hash) => {
        if (err) {
            console.error(err)
            return
        } else {
            var query_edit_profile = "UPDATE `utilizatori` SET parola = '" + hash + "' WHERE ID = " + request.body.ID + ";";
            connection.query(query_edit_profile, function (error, results) {
                if (error) {
                    response.status(400).send('Error in database operation');
                } else {
                    console.log(results.affectedRows + " record(s) updated");
                    response.send(hash);
                }
            });
        }
    })
})

app.post('/programari_noi_user', function (request, response) {
    querry_prog = "SELECT programare.ID, tip_serviciu.tip AS serviciu, tip_serviciu.pret, DATE(programare.data_programare) as data, EXTRACT(HOUR FROM programare.data_programare) as ora FROM (programare INNER JOIN tip_serviciu ON programare.ID_Serviciu = tip_serviciu.ID) INNER JOIN utilizatori ON programare.ID_Utilizator = utilizatori.ID WHERE utilizatori.email LIKE '" + request.body.email + "' AND programare.data_programare >= NOW()"
    connection.query(querry_prog, function (error, results) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            results.forEach(result => result.data.setHours(result.data.getHours() - (result.data.getTimezoneOffset() / 60)));
            response.send(results);
        }
    });
});

app.post('/programari_vechi_user', function (request, response) {
    querry_prog = "SELECT programare.ID, tip_serviciu.tip AS serviciu, tip_serviciu.pret, DATE(programare.data_programare) as data, EXTRACT(HOUR FROM programare.data_programare) as ora FROM (programare INNER JOIN tip_serviciu ON programare.ID_Serviciu = tip_serviciu.ID) INNER JOIN utilizatori ON programare.ID_Utilizator = utilizatori.ID WHERE utilizatori.email LIKE '" + request.body.email + "' AND programare.data_programare < NOW()"
    connection.query(querry_prog, function (error, results) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            results.forEach(result => result.data.setHours(result.data.getHours() - (result.data.getTimezoneOffset() / 60)));
            response.send(results);
        }
    });
});

app.post('/programari_delete', function (request, response) {
    var query_prog = "DELETE FROM `programare` WHERE ID = " + request.body.ID + ";";
    connection.query(query_prog, function (error, results) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            console.log(results.affectedRows + " record(s) updated");
        }
    });
});

app.post('/add_prog', function (request, response) {
    var query_insert_prog = "ALTER TABLE `programare` AUTO_INCREMENT=1; INSERT INTO `programare` (`ID_Serviciu`, `ID_Utilizator`, `data_programare`) VALUES ('" + request.body.ID_Serviciu + "', '" + request.body.ID_Utilizator + "', '" + request.body.data_programare + "');";
    connection.query(query_insert_prog, function (error, results_insert) {
        if (error) {
            console.log(error);
            response.status(400).send('Error in database operation');
        } else {
            results_insert.forEach(res => {
                console.log(res.affectedRows + " record(s) updated");
            })
            response.json(results_insert[1].insertId);
        }
    });
});

app.post('/check_prog_datetime', function (request, response) {
    var query_check_programare = "SELECT * FROM `programare` WHERE data_programare = '" + request.body.data_progamare + "'";
    connection.query(query_check_programare, function (error, results) {
        if (error) {
            console.log(error);
            response.status(400).send('Error in database operation');
        } else {
            if (results.length == 0) {
                var resp = 'Disponibil';
            }
            else {
                var resp = 'Există deja o programare făcută de altcineva în acea zi';
            }
            response.send(resp);
        }
    });
});

app.post('/contact', function (request, response) {
    var mesaj_clienti = "Mesaj de la " + request.body.name + " cu adresa de email '" + request.body.email + "':\n" + request.body.message + "\n";
    console.log(mesaj_clienti);
});

app.listen(port, () => {
    console.log("Server started on port " + port);
});