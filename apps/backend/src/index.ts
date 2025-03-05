import express from "express";

const app = express();

app.get("/health", (req, res) => {
  console.log(req.headers.origin);
  res.status(200).json({ message: "Server is running" });
});

app.listen(8080, (err) => {
  if (err) {
    console.error("Error starting server: ", err);
    process.exit(1);
  }
  console.log("Server started at http://localhost:8080/");
});
