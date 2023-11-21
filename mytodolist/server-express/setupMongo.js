const mongoose = require("mongoose");
require("dotenv").config({ path: "./routes/.env" });
console.log(process.env.DB_URI)
const uri = process.env.DB_URI;
function connect() {
  const options = { useNewUrlParser: true };
  mongoose.connect(uri, options).then(
    () => {
      console.log("Database connection established!");
    },
    (err) => {
      console.log("Error connecting Database instance due to: ", err);
    }
  );
}
module.exports = connect;