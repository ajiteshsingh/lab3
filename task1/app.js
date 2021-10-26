const express = require("express");
const routes = require("./routes");
const PORT = process.env.PORT || 3000;

const app = express();

app.use("/", routes);
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to the backend" });
// });

app.listen(PORT, () => console.log(`server running at port ${PORT}`));
