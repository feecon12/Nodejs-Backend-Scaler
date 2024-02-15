const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

//home route
app.get("/", (req, res) => {
  res.cookie("pageVisited", "home", {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.json({ message: "Hello World" });
});

//product route
app.get("/product", (req, res) => {
  console.log("cookies", req.cookies);
res.cookie("best-seller", "product", {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    path: "/product",
  });
  const { pageVisited } = req.cookies;
  if (pageVisited) {
    res.json({ message: "Welcome to Product page" });
  } else {
    res.json({ message: "You are visiting for the first time" });
  }
});

//clear cookie
app.get("/clearCookie", (req, res) => {
  res.clearCookie("pageVisited"), { path: "/" };
  res.json({ message: "Cookie cleared" });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
