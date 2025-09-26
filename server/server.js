const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const productsRouter = require("./routes/productsRouter");
const userRouter = require("./routes/userRouter");
const cartItemsRouter = require("./routes/cartItemsRouter");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", productsRouter);
app.use("/api", userRouter);
app.use("/api", cartItemsRouter);

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
