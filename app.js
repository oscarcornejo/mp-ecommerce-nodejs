require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var cors = require("cors");

const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token: process.env.PROD_ACCESS_TOKEN,
  integrator_id: process.env.INTEGRATOR_ID,
});

var port = process.env.PORT || 3000;

var app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("assets"));

app.use("/assets", express.static(__dirname + "/assets"));

app.get("/", function (req, res) {
  res.render("home", {
    titlePage: "Home",
  });
});

app.get("/detail", function (req, res) {
  res.render("detail", {
    ...req.query,
    titlePage: "Detail",
  });
});

app.post("/detail", function (req, res) {
  //   console.log("detail", req.body);

  const productImage = `${req.protocol}://${req.hostname}${req.body.img}`;
  const productPrice = req.body.price;

  const preference = {
    items: [
      {
        id: 1234,
        title: req.body.title,
        description: "Dispositivo móvil de Tienda e-commerce",
        quantity: 1,
        currency_id: "ARS",
        picture_url: productImage,
        unit_price: Number(productPrice),
      },
    ],
    payer: {
      name: "Lalo",
      surname: "Landa",
      email: "test_user_63274575@testuser.com",
      phone: {
        area_code: "11",
        number: 22223333,
      },
      identification: {
        type: "DNI",
        number: "11111111",
      },
      address: {
        zip_code: "1111",
        street_name: "Av. Pedro de Valdivia",
        street_number: 123,
      },
    },
    payment_methods: {
      excluded_payment_methods: [{ id: "amex" }], // No permitir "métodos de pagos" de ...
      excluded_payment_types: [{ id: "atm" }], // No permitir "pagos del tipo" ...
      installments: 6,
    },
    back_urls: {
      success: `${req.protocol}://${req.hostname}/success`,
      pending: `${req.protocol}://${req.hostname}/failure`,
      failure: `${req.protocol}://${req.hostname}/pending`,
    },
    notification_url: `${req.protocol}://${req.hostname}/notification`,
    auto_return: "approved",
    external_reference: "oscarcornejo10@gmail.com",
  };

  mercadopago.preferences
    .create(preference)
    .then((response) => {
      //   console.log(response);
      //   res.redirect(response.body.init_point);
      console.log(response.body.init_point);
      return res.status(200).json({
        url_redirect: `${response.body.init_point}`,
      });
    })
    .catch((err) => console.log(err));
});

app.post("/notification", (req, res) => {
  console.log(req.body);
  res.status(201);
});

app.get("/success", function (req, res) {
  res.render("success", {
    titlePage: "Success",
  });
});

app.get("/failure", function (req, res) {
  res.render("failure", {
    titlePage: "Failure",
  });
});

app.get("/pending", function (req, res) {
  res.render("pending", {
    titlePage: "Pending",
  });
});

app.listen(port);
