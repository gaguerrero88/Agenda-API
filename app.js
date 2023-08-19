const express = require("express");
const dotenv = require("dotenv");
const contacts = require("./routes/contacts");
const auth = require("./routes/auth");
const connectDB = require("./db/connectdb");
const authentication = require("./middlewares/authentication");
const notFound = require("./middlewares/not-found");
dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/v1/contacts", authentication, contacts);
app.use("/api/v1/", auth);
app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();