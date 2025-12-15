# Backend Project Structure

This project follows a standard MVC (Model-View-Controller) architecture for a Node.js/Express backend.

## Folder Structure

- **config/**: Contains database configuration and connection logic (e.g., `db.js` for MongoDB connection).
- **models/**: Defines Mongoose schemas and models for data structure and validation (e.g., `ProductModel.js`).
- **routes/**: Defines API endpoints and maps them to controller functions (e.g., `ProductRoutes.js`).
- **controllers/**: Contains the business logic and request handling for each route (e.g., `ProductController.js`).
- **server.js**: The main entry point of the application. It connects to the database and starts the server.
- **app.js**: Initializes the Express app, sets up middleware, and mounts routes.

## Getting Started

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Run the server in development mode:
    ```bash
    npm run dev
    ```
