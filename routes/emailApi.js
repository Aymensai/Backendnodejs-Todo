const express = require("express");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const routerMail = express.Router();
const passport = require("passport");

routerMail.post(
  "/sendMail/:name",
  passport.authenticate("bearer", { session: false }),
  async (req, res, next) => {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "aymensaidane2@gmail.com",
        pass: "hidesoak595749",
      },

      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailtemplate = fs.readFileSync(
      path.resolve("./noTif", "mailNotif.html"),
      { encoding: "utf8" }
    );
    const username = req.params.name;
    const mailParameters = { username: username };
    const html = ejs.render(mailtemplate, mailParameters);
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Saidane Aymen 👻" <aymensaidane2@gmail.com>',
      to: "aymensaidane2@gmail.com",
      subject: "Hello ✔",
      html: html,
    });

    res.send({ message: "the email is sent!" });
  }
);

module.exports = routerMail;
