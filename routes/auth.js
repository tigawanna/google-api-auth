const express = require("express");
const { google } = require("googleapis");
const path = require("path");
const nodemailer = require("nodemailer");

const router = express.Router();

//replace below with your creds, also note that i hard coded the
//refresh and access token that i got from the response
//ideally you'd save it somewhere and load it in as a variable
//and refetch if it's invalid

const creds = {
  client_email: "email1@gmail.com",
  client_id: "client_id",
  client_secret: "your client secret",
  serveruri: "http://localhost:4000",
  uirui: "http://localhost:3000",
  redirectURL: "http://localhost:4000/auth/creds",
  access_token: "your access token",
  refresh_token: "your refresh token",
};

const oauth2Client = new google.auth.OAuth2(
  creds.client_id,
  creds.client_secret,
  creds.redirectURL
);
const scopes = ["https://mail.google.com/"];

const sendMail = async () => {
  try {
    // Create the email envelope (transport)
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: creds.client_email,
        clientId: creds.client_id,
        clientSecret: creds.client_secret,
        accessToken: creds.access_tokenfb,
      },
    });

    // Create the email options and body
    // ('email': user's email and 'name': is the e-book the user wants to receive)
    const mailOptions = {
      from: `FRONT <${creds.client_email}>`,
      to: "email2@gmail.com",
      subject: `[FRONT]- Here is your e-Book!`,
      html: `Enjoy learning!`,
    };

    // Set up the email options and delivering it
    const result = await transport.sendMail(mailOptions);
    console.log("success    === ", result);
    return result;
  } catch (error) {
    console.log("error sendng mail    === ", error);
    return error;
  }
};

//default auth route
router.get("/", async (req, res) => {
  console.log("hit auth route");
  res.send("auth route");
});

//route to handle api client authentication
router.get("/google", async (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "offline",
    // If you only need one scope you can pass it as a string
    scope: scopes,
  });
  console.log("url returned ======= ", url);
  //url returned by google to redirect us to the login consent page // page
  if (url) {
    // render an ejs view with a button that redirects to the url
    res.render("authorize", { url: url });
  }
});

//redirect route that recieves the authentication creds abd
//swaps them for access&refresh token

router.get("/creds", async (req, res) => {
  const code = req.query.code;
  console.log("query ==== ", code);
  //returns access and refresh tokens
  const { tokens } = await oauth2Client.getToken(code);
  console.log("query token response==== ", tokens);
  //perform save to firestore or your db of choice here

  //authenticate oauthclient
  oauth2Client.setCredentials(tokens);

  //render a view to indicate completion
  res.render("done");
});

router.get("/mail", async (req, res) => {
  let email = "";
  await sendMail()
    .then((result) => (email = result))
    .catch((err) => (email = err));
  console.log("email sent or error    === ", email);

  await res.json(email);
});

module.exports = router;
