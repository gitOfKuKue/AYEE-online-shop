const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

console.log("EMAIL:", process.env.EMAIL);
console.log("PASS:", process.env.PASS);
console.log("PORT:", process.env.PORT);
