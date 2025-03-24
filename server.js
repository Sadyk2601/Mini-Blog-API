require("dotenv").config();
const connectDb = require("./config/db.js");
connectDb();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
