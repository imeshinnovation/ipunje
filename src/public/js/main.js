
let count = 0;
let memcalc = "";
let memopera = "";

function retrocalc(){
    let dispcalc = document.getElementById("dispcalc");
    
    if(dispcalc.value.length <= 1){ 
        dispcalc.value = "0"
    } else {
        dispcalc.value = dispcalc.value.slice(0, -1);
    }
}

function addncalc(num) {
    let dispcalc = document.getElementById("dispcalc");
    if(dispcalc.value == "0"){
        dispcalc.value = num;
    } else {
        dispcalc.value += num;
    }
}

function operacalc(oper){
    let dispcalc = document.getElementById("dispcalc");
    switch(oper){
        default:
            memcalc = dispcalc.value;
            memopera = oper;
            dispcalc.value = "0";
            break;
        case 'equal':
            switch(memopera){
                case 'plus':
                    dispcalc.value = ( parseInt(memcalc) + parseInt(dispcalc.value) );
                    break;
                case 'multi':
                    dispcalc.value = (parseInt(memcalc) * parseInt(dispcalc.value));
                    break;
                case 'minus':
                    dispcalc.value = (parseInt(memcalc) - parseInt(dispcalc.value));
                    break;
                case 'divi':
                    dispcalc.value = (parseInt(memcalc) / parseInt(dispcalc.value));
                    break;
                case 'percent':
                    dispcalc.value = ((parseInt(memcalc) * parseInt(dispcalc.value)) / 100);
                    break;
            }
    }
}


function clearcalc() {
    let dispcalc = document.getElementById("dispcalc");
    dispcalc.value = "0";
    memcalc = "";
    memopera = "";
}

function calcUI(){
    const UI = `
        <div class="card border-0">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12 mb-3">
                        <input type="text" class="form-control bg-light border-dark" id="dispcalc" value="0" readonly>
                    </div>
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-12">
                                <table class="w-100">
                                    <tbody>
                                        <tr>
                                            <td><button class="btn btn-secondary shadow-sm fw-fw w-100" onclick="clearcalc();"><i class="fas fa-c fa-fw"></i></button></td>
                                            <td><button class="btn btn-secondary shadow-sm fw-fw w-100" onclick="retrocalc();"><i class="fas fa-arrow-left fa-fw"></i></button></td>
                                            <td><button class="btn btn-secondary shadow-sm fw-fw w-100" onclick="operacalc('percent');"><i class="fas fa-percent fa-fw"></i></button></td>
                                            <td><button class="btn btn-secondary shadow-sm fa-fw w-100" onclick="operacalc('divi')"><i class="fas fa-divide fa-fw"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td><button class="btn btn-light shadow-sm fw-fw w-100" onclick="addncalc(1);"><i class="fas fa-1 fa-fw"></i></button></td>
                                            <td><button class="btn btn-light shadow-sm fw-fw w-100" onclick="addncalc(2);"><i class="fas fa-2 fa-fw"></i></button></td>
                                            <td><button class="btn btn-light shadow-sm fw-fw w-100" onclick="addncalc(3);"><i class="fas fa-3 fa-fw"></i></button></td>
                                            <td><button class="btn btn-secondary shadow-sm fa-fw w-100" onclick="operacalc('multi')"><i class="fas fa-xmark fa-fw"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td><button class="btn btn-light shadow-sm fw-fw w-100" onclick="addncalc(4);"><i class="fas fa-4 fa-fw"></i></button></td>
                                            <td><button class="btn btn-light shadow-sm fw-fw w-100" onclick="addncalc(5);"><i class="fas fa-5 fa-fw"></i></button></td>
                                            <td><button class="btn btn-light shadow-sm fw-fw w-100" onclick="addncalc(6);"><i class="fas fa-6 fa-fw"></i></button></td>
                                            <td><button class="btn btn-secondary shadow-sm fa-fw w-100" onclick="operacalc('minus')"><i class="fas fa-minus fa-fw"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td><button class="btn btn-light shadow-sm fw-fw w-100" onclick="addncalc(7);"><i class="fas fa-7 fa-fw"></i></button></td>
                                            <td><button class="btn btn-light shadow-sm fw-fw w-100" onclick="addncalc(8);"><i class="fas fa-8 fa-fw"></i></button></td>
                                            <td><button class="btn btn-light shadow-sm fw-fw w-100" onclick="addncalc(9);"><i class="fas fa-9 fa-fw"></i></button></td>
                                            <td><button class="btn btn-secondary shadow-sm fa-fw w-100" onclick="operacalc('plus')"><i class="fas fa-plus fa-fw"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td colspan="3"><button class="btn btn-light shadow-sm fw-fw w-100" onclick="addncalc(0);"><i class="fas fa-0 fa-fw"></i></button></td>
                                            <td><button class="btn btn-secondary shadow-sm fa-fw w-100" onclick="operacalc('equal');"><i class="fas fa-equals fa-fw"></i></button></td>
                                        </tr>
                                    </table>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    `;
    runModal('bg-primary', '<div class="w-100"><div style="margin:1px; font-weight:bold;"><i class="fas fa-calculator fa-fw me-2"></i>Calculadora</div><div class="position-absolute top-0 end-0 pt-3 pe-3"><button class="btn btn-danger" onclick="closeModal();"> <i class="fas fa-xmark fa-fw"></i></button></div></div>', UI);
}


function runModal(bg, title, content) {
    $("#modalHeader").removeClass("bg-primary");
    $("#modalHeader").addClass(bg);
    $("#modalTitle").html(title);
    $("#modalBody").html(content);
    $("#mainModal").modal('show');
}

function closeModal() {
    $("#mainModal").modal('hide');
}

function loadContent(main, uri) {
    $("#" + main).html(`<div style="width:100%; height:100%; text-align:center; padding-top:30px; padding-bottom:30px; color: #1A76D1;"><i class="fas fa-cog fa-spin fa-4x"></i></div>`);
    $("#" + main).load(uri).fadeIn('500');
}

function delDialog(id, names, macro, title) {
    const body = `
        ¿Esta Seguro de Eliminar a ${names}?
        <br><br>
        <div class="btn-group w-100">
            <button class="btn btn-danger" onclick="${macro}('${id}')"><i class="fas fa-check fa-fw"></i></button>
            <button class="btn btn-primary" onclick="closeModal();"><i class="fas fa-times fa-fw"></i></button>
        </div>
    `;
    runModal('bg-danger', title, body)
}

function remCount(id) {
    const alerta = document.getElementById("alerta")
    axios.post('/financiero/delcuenta', { id }).then((res) => {
        closeModal();
        loadContent('maincuentas', '/financiero/cuentas');
    })
}

function remProd(id) {
    const alerta = document.getElementById("alerta")
    axios.post('/financiero/delprod', { id }).then((res) => {
        closeModal();
        loadContent('maincuentas', '/financiero/prodfin');
    })
}


function remGroupF(id) {
    const alerta = document.getElementById("alerta")
    axios.post('/congregacional/delgroupf', { id }).then((res) => {
        closeModal();
        loadContent('memr', '/congregacional/grupof');
    })
}

function remMember(id) {
    const alerta = document.getElementById("alerta")
    axios.post('/congregacional/delmember', { id }).then((res) => {
        closeModal();
        loadContent('memr', '/congregacional/members');
    })
}

function remUser(id) {
    const alerta = document.getElementById("alerta")
    axios.post('/admon/delmember', { id }).then((res) => {
        closeModal();
        loadContent('mainadmon', '/admon/members');
    })
}

function remRoll(id) {
    const alerta = document.getElementById("alerta")
    axios.post('/admon/delroll', { id }).then(function (res) {
        if (res.data.msg == 'OK') {
            closeModal();
            loadContent('mainadmon', '/admon/roles');
        }
    })
}

function remLicencia(id) {
    const alerta = document.getElementById("alerta")
    axios.post('/admon/dellicencia', { id }).then(function (res) {
        if (res.data.msg == 'OK') {
            closeModal();
            loadContent('mainadmon', '/admon/licencias');
        }
    })
}

function remSucursal(id) {
    const alerta = document.getElementById("alerta")
    axios.post('/congregacional/delsucursal', { id }).then(function (res) {
        if (res.data.msg == 'OK') {
            closeModal();
            location.reload();
        }
    })
}

function remOficial(id) {
    const alerta = document.getElementById("alerta")
    axios.post('/admon/deloficial', { id }).then(function (res) {
        if (res.data.msg == 'OK') {
            closeModal();
            loadContent('mainadmon', '/admon/oficiales')
        }
    })
}


function addLicen() {
    const alerta = document.getElementById("alerta")
    const datos = {
        licencia: $("#licencia").val(),
        description: $("#description").val(),
    }
    axios.post('/admon/addlicencia', datos).then(function (res) {
        if (res.data.msg == 'OK') {
            loadContent('mainadmon', '/admon/licencias');
        } else {
            alerta.classList.add('alert-danger')
            alerta.classList.remove('alert-success')
            alerta.innerHTML = "Error en el Registro"
            $("#alerta").slideDown(500)
            setTimeout(function () {
                $("#alerta").slideUp(500)
            }, 1000)
        }
    }).catch(function (err) {
        alerta.classList.add('alert-danger')
        alerta.classList.remove('alert-success')
        alerta.innerHTML = "Error en el Registro"
        $("#alerta").slideDown(500)
        setTimeout(function () {
            $("#alerta").slideUp(500)
        }, 1000)
    })
}

function addOficial() {
    const alerta = document.getElementById("alerta")
    const datos = {
        names: $("#names").val(),
        cargo: $("#cargo").val(),
        rut: $("#rut").val()
    }
    axios.post('/admon/addoficial', datos).then(function (res) {
        if (res.data.msg == 'OK') {
            loadContent('mainadmon', '/admon/oficiales');
        } else {
            $("#alerta").removeClass("alert-success")
            $("#alerta").addClass("alert-danger")
            $("#alerta").html("Error en el Registro")
            $("#alerta").slideDown(500)
            setTimeout(function () {
                $("#alerta").slideUp(500)
            }, 1500)
        }
    }).catch(function (err) {
        $("#alerta").removeClass("alert-success")
        $("#alerta").addClass("alert-danger")
        $("#alerta").html("Error en el Registro")
        $("#alerta").slideDown(500)
        setTimeout(function () {
            $("#alerta").slideUp(500)
        }, 1000)
    })
}


function addData() {
    const alerta = document.getElementById("alerta")
    const datos = {
        roll: $("#roll").val(),
        description: $("#description").val(),
        grant: $("#grant option:selected").val()
    }
    axios.post('/admon/addroll', datos).then(function (res) {
        if (res.data.msg == 'OK') {
            loadContent('mainadmon', '/admon/roles');
        } else {
            alerta.classList.add('alert-danger')
            alerta.classList.remove('alert-success')
            alerta.innerHTML = "Error en el Registro"
            $("#alerta").slideDown(500)
            setTimeout(function () {
                $("#alerta").slideUp(500)
            }, 1000)
        }
    }).catch(function (err) {
        alerta.classList.add('alert-danger')
        alerta.classList.remove('alert-success')
        alerta.innerHTML = "Error en el Registro"
        $("#alerta").slideDown(500)
        setTimeout(function () {
            $("#alerta").slideUp(500)
        }, 1000)
    })
}

function updGF(id) {
    const alerta = document.getElementById("alerta")
    const datos = {
        id: $("#id").val(),
        name_family: $("#name_family").val(),
        congregation: $("#congregation").val(),
    }
    axios.post('/congregacional/updgroupf', datos).then((res) => {
        if (res.data.modifiedCount == 1) {
            loadContent('memr', '/congregacional/grupof');
        } else {
            alerta.classList.add('alert-danger')
            alerta.classList.remove('alert-success')
            alerta.innerHTML = "No hay Cambios que Guardar"
            $("#alerta").slideDown(500)
            setTimeout(function () {
                $("#alerta").slideUp(500)
            }, 1000)
        }
    })
}

function addGF() {
    const alerta = document.getElementById("alerta")
    const datos = {
        name_family: $("#name_family").val(),
        congregation: $("#congregation").val(),
    }
    axios.post('/congregacional/addgroupf', datos).then(function (res) {
        if (res.data.msg == 'OK') {
            loadContent('memr', '/congregacional/grupof');
        } else {
            alerta.classList.add('alert-danger')
            alerta.classList.remove('alert-success')
            alerta.innerHTML = "Error en el Registro"
            $("#alerta").slideDown(500)
            setTimeout(function () {
                $("#alerta").slideUp(500)
            }, 1000)
        }
    }).catch(function (err) {
        alerta.classList.add('alert-danger')
        alerta.classList.remove('alert-success')
        alerta.innerHTML = "Error en el Registro"
        $("#alerta").slideDown(500)
        setTimeout(function () {
            $("#alerta").slideUp(500)
        }, 1000)
    })
}


function loginstep() {
    const email = document.getElementById("email")
    const passwd = document.getElementById("passwd")
    const a2f = document.getElementById("a2f")
    const icon = document.getElementById("icon")
    const steper = document.getElementById("steper")
    const more = document.getElementById("more")
    const mkac = document.getElementById("mkac")
    const alerta = document.getElementById("alerta")

    let { val1, val2, val3 } = ""

    switch (count) {
        case 0:
            if (email.value == "") {
                alerta.classList.add('alert-danger')
                alerta.classList.remove('alert-success')
                alerta.innerHTML = "Debes Ingresar un Correo"
                mkac.classList.add('d-none')
                $("#alerta").slideDown(500)
                setTimeout(function () {
                    $("#alerta").slideUp(500)
                }, 1000)
            } else {
                email.classList.add('d-none')
                icon.classList.remove('fa-envelope')
                icon.classList.add('fa-lock')
                passwd.classList.remove('d-none')
                mkac.classList.remove('d-none')
                mkac.setAttribute("href", "/recover")
                mkac.innerHTML = "Recuperar Contraseña"
                count = 1
            }
            break
        case 1:
            if (passwd.value == "") {
                alerta.classList.add('alert-danger')
                alerta.classList.remove('alert-success')
                alerta.innerHTML = "Debes Ingresar la Contraseña"
                $("#alerta").slideDown(500)
                setTimeout(function () {
                    $("#alerta").slideUp(500)
                }, 1000)
            } else {
                val1 = email.value
                icon.classList.remove('fa-lock')
                icon.classList.add('fa-shield')
                passwd.classList.add('d-none')
                a2f.classList.remove('d-none')
                more.innerHTML = "<br>Se ha enviado un mensaje a su buzón de correo con el código OTP (One Time Password)."
                mkac.setAttribute("href", "#")
                mkac.setAttribute("onclick", "sendCode('" + val1 + "');")
                mkac.innerHTML = "Enviar Código OTP Nuevamente"
                steper.innerHTML = "Validar e Ingresar"
                sendCode(val1)
                count = 2
            }
            break
        case 2:
            val1 = email.value
            val2 = passwd.value
            if (a2f.value == "") {
                alerta.classList.add('alert-danger')
                alerta.classList.remove('alert-success')
                alerta.innerHTML = "Ingresa el Código OTP"
                $("#alerta").slideDown(500)
                setTimeout(function () {
                    $("#alerta").slideUp(500)
                }, 1000)
            } else {
                val3 = a2f.value
                axios.post('/login', {
                    email: val1,
                    password: val2,
                    a2f: val3
                }, {
                    Headers: {
                        'content-type': 'text/json'
                    }
                }).then((response) => {
                    if (response.data.msg == 0) {
                        alerta.classList.add('alert-danger')
                        alerta.classList.remove('alert-success')
                        alerta.innerHTML = "Credenciales Incorrectas, Intenta Nuevamente"
                        $("#alerta").slideDown(500)
                        setTimeout(function () {
                            $("#alerta").slideUp(500)
                        }, 1000)
                    } else {
                        alerta.classList.remove('alert-danger')
                        alerta.classList.add('alert-success')
                        alerta.innerHTML = "BIENVENIDO A IPUNSOFT"
                        $("#alerta").slideDown(500)
                        setTimeout(function () {
                            $("#alerta").slideUp(500, function () {
                                location.href = '/';
                            })
                        }, 1000)
                    }
                })
            }
            break
    }
}

function sendCode(email) {
    const alerta = document.getElementById("alerta")
    axios.post('/sendcode', { mail: email }, {
        Headers: {
            'content-type': 'text/json'
        }
    }).then((data) => {
        if (data.data.msg == "Denied") {
            alerta.classList.add('alert-danger')
            alerta.classList.remove('alert-success')
            alerta.innerHTML = "Su Correo No Existe en la Plataforma"
            $("#alerta").slideDown(500)
            setTimeout(function () {
                $("#alerta").slideUp(500, function () {
                    location.reload()
                })
            }, 1000)
        } else {
            alerta.classList.remove('alert-danger')
            alerta.classList.add('alert-success')
            alerta.innerHTML = "Mensaje Enviado"
            $("#alerta").slideDown(500)
            setTimeout(function () {
                $("#alerta").slideUp(500)
            }, 1000)
        }
    })
}

function toHtmlEntities(str) {
    str = str.replaceAll(' ', '%20');
    str = str.replaceAll('#', '%23');
    return str;
};

function getLocation() {
    const address = document.getElementById("direccion");
    let latx = document.getElementById("latitud");
    let lngx = document.getElementById("longitud");
    const uri = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCtQLkmd1Of88ecJgjnOpwcVY3GF37kWh4&address=' + toHtmlEntities(address.value);
    axios.get(uri).then((res) => {
        const { lat, lng } = res.data.results[0].geometry.location;
        latx.value = lat;
        lngx.value = lng;
    })
}

function countFamily(id) {
    const counting = document.getElementById("count_" + id);
    axios.get('/congregacional/countf/' + id).then((res) => {
        $("#count_" + id).html(res.data.count);
    })
}

function convertBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

async function uploadImage(event) {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    $("#image64").val(base64);
};

function preview() {
    frame.src = URL.createObjectURL(event.target.files[0]);
}
function clearImage() {
    document.getElementById('formFile').value = null;
    frame.src = "";
}
function openFile() {
    $("#formFile").click();
}

function sendAlert(msg, evento) {
    if(typeof(evento) !== "undefined"){
        evento.preventDefault();
    }
    alerta.classList.add('alert-danger');
    alerta.classList.remove('alert-success');
    alerta.innerHTML = msg;
    $("#alerta").slideDown(1000);
    setTimeout(function () {
        $("#alerta").slideUp(1000);
    }, 3000);
}

$(document).ready(function () {
    //setTimeout(function(){ 
    $('.preloader').addClass('preloader-deactivate');
    //}, 500);

});