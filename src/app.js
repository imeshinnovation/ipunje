const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const uuid = require("uuid");
//const cors = require("cors");
const { create } = require('express-handlebars');
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')

dotenv.config();
const env = process.env;

morgan.token("id", (req) => {
  return req.id;
});

const MONGODB_URL = `mongodb://${env.USERDB}:${env.PASSDB}@${env.SERVERDB}:${env.PORTDB}/${env.DBNAME}?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`;

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });



const { white } = require('./libs/loadmodels');

const app1 = express();

const hbs = create({
  helpers: require('./libs/helpers'),
  extname: '.hbs'
});


app1.engine('.hbs', hbs.engine);
app1.set('view engine', '.hbs');
app1.set('views', path.join(__dirname, 'views'))

// middlewares
app1.use(express.json({ limit: '50mb' }));
app1.use(express.urlencoded({ limit: '50mb', extended: true }));

//app1.use(cors());
app1.use(assignId);
/*
const whitelist = [];
const corsOptions = new Promise(async (resolve, reject) => {
  const wite = await getwhite()
  wite.forEach((data) => {
    whitelist.push(data.domain);
  })
  resolve({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) === -1) {
        callback(null, true);
      } else {
        callback(new Error("No esta Permitido"));
      }
    },
  })
}).then((data) => {
  return data;
})
*/

app1.set("port", process.env.PORT || 5500);

app1.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app1.use(bodyParser.json());
//app1.use(morgan(":id :method :url :response-time"));
app1.use(morgan('dev'));

app1.use(express.static(__dirname + "/public"));

app1.use(session({
  secret: env.TKEY,
  resave: false,
  saveUninitialized: false,
  maxAge: 36000 * 365 * 365,
  store: MongoStore.create({
    mongoUrl: MONGODB_URL,
    touchAfter: 365 * 365 * 36000
  })
}))


app1.use("/css", express.static(path.join(__dirname + "../../node_modules/bootstrap/dist/css")));
app1.use("/css", express.static(path.join(__dirname + "../../node_modules/leaflet/dist")));
app1.use("/js", express.static(path.join(__dirname + "../../node_modules/jquery/dist")));
app1.use("/js", express.static(path.join(__dirname + "../../node_modules/bootstrap/dist/js")));
app1.use("/css", express.static(path.join(__dirname + "../../node_modules/bootstrap-table/dist")));
app1.use("/js", express.static(path.join(__dirname + "../../node_modules/@popperjs/core/dist/umd")));
app1.use("/js", express.static(path.join(__dirname + "../../node_modules/bootstrap-table/dist")));
app1.use("/js", express.static(path.join(__dirname + "../../node_modules/bootstrap-toggle/js")));
app1.use("/css", express.static(path.join(__dirname + "../../node_modules/bootstrap-toggle/css")));
app1.use("/js", express.static(path.join(__dirname + "../../node_modules/axios/dist")));
app1.use("/js", express.static(path.join(__dirname + "../../node_modules/apexcharts/dist")));
app1.use("/js", express.static(path.join(__dirname + "../../node_modules/leaflet/dist")));
app1.use(
  "/css",
  express.static(path.join(__dirname + "../../node_modules/@fortawesome/fontawesome-free/css")
  ));
app1.use(
  "/js",
  express.static(path.join(__dirname + "../../node_modules/@fortawesome/fontawesome-free/js")
  ));
app1.use(
  "/webfonts",
  express.static(path.join(__dirname + "../../node_modules/@fortawesome/fontawesome-free/webfonts"
  )
  ));

/*
app1.use("/api", cors(corsOptions), require("./routes/api"));
app1.use("/", cors(corsOptions), require("./routes/index"));
app1.use("/congregacional", cors(corsOptions), require("./routes/congregacion"));
app1.use("/admon", cors(corsOptions), require("./routes/admon"));
*/
app1.use("/api", require("./routes/api"));
app1.use("/", require("./routes/index"));
app1.use("/congregacional", require("./routes/congregacion"));
app1.use("/admon", require("./routes/admon"));
app1.use("/financiero", require("./routes/financiero"));



app1.use((req, res, next) => {
  req.session.user = '';
  req.session._garbage = Date();
  req.session.touch();
  next();
});

function assignId(req, res, next) {
  const id = uuid.v4();
  req.id = id;
  next();
}

async function getwhite() {
  const whils = await white.find({ 'status': 1 }).lean();
  return whils;
}

app1.listen(app1.get("port"), "0.0.0.0", () =>
  console.log("Servidor Listo: http://localhost:" + app1.get("port"))
);
