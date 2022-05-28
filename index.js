const express = require("express");

const authRoute = require("./routes/auth");

const PORT = 4000;
const app = express();

app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.json({
    data: "API is home route working, navigate to /google to start autentication",
  });
});

app.use("/auth", authRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
