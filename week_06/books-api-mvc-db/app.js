const express = require("express");
const booksController = require("./controllers/booksController");
const sql = require("mssql"); // Assuming you've installed mssql
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser");
const validateBook = require("./middlewares/validateBook");
const usersController = require("./controllers/usersController");

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default port

const staticMiddleware = express.static("public"); // Path to the public folder

//Include the body-parser middleware to handle JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling

app.use(staticMiddleware); // Mount the static middleware

// Routes for GET request (replace with appropriate routes for update and delete later)
app.get("/books", booksController.getAllBooks);
app.get("/books/:id", booksController.getBookById);

// Post for creating books (can handle JSON data)
app.post("/books", validateBook, booksController.createBook);

//PUT for updating books
app.put("/books/:id", validateBook, booksController.updateBook);

// DELETE for deleting books
app.delete("/books/:id", booksController.deleteBook);

app.get("/users/with-books", usersController.getUsersWithBooks); // Get users with books

// Search users
app.get("/users/search", usersController.searchUsers);

// User routes
app.post("/users", usersController.createUser); // Create user
app.get("/users", usersController.getAllUsers); // Get all users
app.get("/users/:id", usersController.getUserById); // Get user by ID
app.put("/users/:id", usersController.updateUser); // Update user
app.delete("/users/:id", usersController.deleteUser); // Delete user


app.listen(port, async() => {
    try {
        // connect to the database
        await sql.connect(dbConfig);
        console.log("Database connection established successfully");
    }
    catch(err) {
        console.log("Database connection error:", err);
        // Terminate the application with an error code (optional)
        process.exit(1); // Exit with code 1 indication an error
    }

    console.log(`Server listening on port ${port}`);
});

// Close the connection pool on SIGINT signal
process.on("SIGINT", async() => {
    console.log("Server is gracefully shutting down");
    // Perform cleanup tasks (e.g., close database connections)
    await sql.close();
    console.log("Databse connection closed");
    process.exit(0); // Exit with code 0 indication successful shutdown
});