const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://localhost/business_card_app", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log(chalk.magentaBright.bold("connected to MongoDb!")))
//   .catch((error) =>
//     console.log(chalk.redBright.bold(`could not connect to mongoDb: ${error}`))
//   );

module.exports = mongoose.connect(process.env.MONGO_CON_STR, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
