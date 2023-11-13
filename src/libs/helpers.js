const nodemailer = require('nodemailer')
const axios = require("axios")
const url = require('url')
const cron = require('node-cron')

const Helpers = {
    null: (v1) => v1 == this.null,
    eq: (v1, v2) => v1 == v2,
    ne: (v1, v2) => v1 !== v2,
    lt: (v1, v2) => v1 < v2,
    gt: (v1, v2) => v1 > v2,
    lte: (v1, v2) => v1 <= v2,
    gte: (v1, v2) => v1 >= v2,
    and() {
        return Array.prototype.every.call(arguments, Boolean);
    },
    or() {
        return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    },
    Schedule: (secus, minus, hours, days, months, weeks, email, message) => {
        secus === null ? secus = '*' : secus
        minus === null ? minus = '*' : minus
        hours === null ? hours = '*' : hours
        days === null ? days = '*' : days
        months === null ? months = '*' : months
        weeks === null ? weeks = '*' : weeks
        cron.schedule(`${secus} ${minus} ${hours} ${days} ${months} ${weeks}`, () => {
          module.exports.EnviarCorreo(email, 'Recordatorio Agendamiento', message)
        }, {
          scheduled: true,
          timezone: "America/Santiago"
        }) 
        
    },
    EnviarCorreo: (email, asunto, cuerpo) => {
        const transporter = nodemailer.createTransport({
            host: "mail.ipunje.cl",
            port: 465,
            secure: true, // upgrade later with STARTTLS
            auth: {
              user: "notificaciones@ipunje.cl",
              pass: "pdzgh@7WIW)2",
            },
            tls: {rejectUnauthorized: false},
            debug:true
        })

        const mailOptions = {
            from: 'notificaciones@ipunje.cl',
            to: email,
            bcc: 'ceo@imesh.app',
            subject: 'Notificación: ' + asunto,
            text: cuerpo + '\n\n-----------------------------\nIPUNSOFT\n\nEste Mensaje fué enviado de Forma Automática',
            html: cuerpo + '<br><br>IPUNSOFT<br>Este Mensajes fué enviado de Forma Automática'
          }
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
           console.log(error)
            } else {
              console.log('Email sent: ' + info.response)
            }
          })
    },
    daterecord: () => {
        const data = new Date()
        const day = data.getDate() < 10 ? '0' + data.getDate() : data.getDate()
        const month = (data.getMonth() + 1) < 10 ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1)
        const year = data.getFullYear()
        const hours = data.getHours() < 10 ? '0' + data.getHours() : data.getHours()
        const minutes = data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes()
        const seconds = data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds()
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
    },
    onlydate: () => {
      const data = new Date()
      const day = data.getDate() < 10 ? '0' + data.getDate() : data.getDate()
      const month = (data.getMonth() + 1) < 10 ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1)
      const year = data.getFullYear()
      return `${day}/${month}/${year}`
    },
    fulln: (v1, v2) => {
      const v3 = v1 + ' ' + v2;
      return v3.trim();
    }
}

module.exports = Helpers;
