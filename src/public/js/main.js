

var count = 0;

function sendCode(email) {
    const alerta = document.getElementById("alerta")

    axios.post('/sendcode', { mail: email }, {
        Headers: {
            'content-type': 'text/json'
        }
    }).then((data) => {
        console.log(data.data.msg)
        if (data.data.msg == "Denied") {
            alerta.classList.add('alert-danger')
            alerta.classList.remove('alert-success')
            alerta.innerHTML = "Su Correo No Existe en la Plataforma"
            $("#alerta").slideDown(1000)
            setTimeout(function () {
                $("#alerta").slideUp(1000, function () {
                    location.reload()
                })
            }, 5000)
        } else {
            alerta.classList.remove('alert-danger')
            alerta.classList.add('alert-success')
            alerta.innerHTML = "Mensaje Enviado"
            $("#alerta").slideDown(1000)
            setTimeout(function () {
                $("#alerta").slideUp(1000)
            }, 5000)
        }
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
                $("#alerta").slideDown(1000)
                setTimeout(function () {
                    $("#alerta").slideUp(1000)
                }, 2000)
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
                $("#alerta").slideDown(1000)
                setTimeout(function () {
                    $("#alerta").slideUp(1000)
                }, 2000)
            } else {
                val1 = email.value
                icon.classList.remove('fa-lock')
                icon.classList.add('fa-shield')
                passwd.classList.add('d-none')
                a2f.classList.remove('d-none')
                more.innerHTML = "<br>Se ha enviado un mensaje a su buzón de correo con el código de validación."
                mkac.setAttribute("href", "#")
                mkac.setAttribute("onclick", "sendCode('" + val1 + "');")
                mkac.innerHTML = "Enviar Código Nuevamente"
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
                alerta.innerHTML = "Ingresa el Código de Validación"
                $("#alerta").slideDown(1000)
                setTimeout(function () {
                    $("#alerta").slideUp(1000)
                }, 2000)
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
                    console.log(response.data.msg)
                    if (response.data.msg == 0) {
                        alerta.classList.add('alert-danger')
                        alerta.classList.remove('alert-success')
                        alerta.innerHTML = "Credenciales Incorrectas, Intenta Nuevamente"
                        $("#alerta").slideDown(1000)
                        setTimeout(function () {
                            $("#alerta").slideUp(1000)
                        }, 3000)
                    } else {
                        alerta.classList.remove('alert-danger')
                        alerta.classList.add('alert-success')
                        alerta.innerHTML = "BIENVENIDO A IPUNSOFT"
                        $("#alerta").slideDown(1000)
                        setTimeout(function () {
                            $("#alerta").slideUp(1000, function () {
                                location.href='/';
                            })
                        }, 3000)
                    }
                })
            }
            break
    }
}


$(document).ready( function() {
    //for use in production please remove this setTimeOut
    setTimeout(function(){ 
        $('.preloader').addClass('preloader-deactivate');
    }, 1000);
    //uncomment this line for use this snippet in production
    //$('.preloader').addClass('preloader-deactivate');
    
});