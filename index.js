const express = require("express");
// const cron = require('node-cron');
const todoController = require("./routes/todoApi");
const bodyParser = require("body-parser");
const routes = require("./routes/userApi");
const routerMail = require("./routes/emailApi");
const uploadPicture = require("./routes/fileApi");
const dataBase = require("./dataBase/dataBase");
const cors = require('cors'); 

const passport = require("passport");

require("./passport");
const app = express();
app.use(cors());
app.use(passport.initialize());

// cron.schedule('*/2 * * * *', () => {
//   console.log('running a task every two minutes');
// });

app.use(bodyParser.json());
app.use("/", routerMail);
app.use("/", routes);
app.use("/", uploadPicture);
todoController(app);

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
