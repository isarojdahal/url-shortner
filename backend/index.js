const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db.config");
const mainRoutes = require("./routes/app.route");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", mainRoutes);

async function connectToDB() {
  await sequelize.authenticate();
  await sequelize.sync();
}

try {
  connectToDB().then(() => {
    console.log("Database connected");
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  });
} catch (err) {
  console.error("Error while connecting to the database", err);
}
