const cors = require("cors");
const { config } = require("dotenv");
const express = require("express");
const dbConfig = require("./config/db.config");
const User = require("./models/user.models");
const routers = require("./routers");
config();

// INIT
const app = express();
const PORT = process.env.PORT;

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTER
routers(app);

// LISTEN
app.listen(PORT, async () => {
  // INFO PORT
  console.log(`SERVER UP AND RUNNING ON PORT ${PORT}`);

  // CONNECT TO MYSQL
  try {
    await dbConfig.authenticate();

    // await User.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
