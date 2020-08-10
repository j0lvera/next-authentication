const { createSchema } = require("./db");

createSchema()
  .then(() => {
    console.log("Database created");
    process.exit();
  })
  .catch((error) => console.log("Error creating the database", error));