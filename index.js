require('dotenv').config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const mongoUrl = process.env.MONGO_URL;

// Set strictQuery option
mongoose.set('strictQuery', false); // or false, depending on your preference

mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => console.log("Connected to database"))
  .catch((e) => console.log(e));

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "User Management API",
      version: "1.0.0",
      description: "API documentation for User Management System",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5050}`,
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
console.log(`http://localhost:${process.env.PORT || 5050}/api-docs`);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Use user routes
app.use("/api", userRoutes);

// Use the port from the .env file
const PORT = process.env.PORT || 5050; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
