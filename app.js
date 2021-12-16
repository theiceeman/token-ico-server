const express = require("express");
const cors = require("cors");
const corsOptions = require("./lib/cors");
const app = express();
require("dotenv").config();

app.use(cors(corsOptions));

// routes
const user_routes = require("./routes/user-routes");
app.use("/api/", user_routes);

//SERVER CONFIGURATION
const server = app.listen(process.env.PORT, () => {
  console.log(`App listening on Port: ${process.env.PORT}`);
});
