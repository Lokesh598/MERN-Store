const app = require("./app.js");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database.js");

// handling uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to uncaught exceptions`);
    process.exit(1);

});
//config

dotenv.config({ path: "backend/config/config.env"});

// connect to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})

// Handle unhandled promise rejections

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejection`);
    server.close(() => {
        process.exit(1);
    });
});