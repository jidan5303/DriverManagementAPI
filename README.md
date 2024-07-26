# Driver Management API

This repository contains the server-side code for the Driver Management API, implemented using Node.js and Express.

## Getting Started

To set up the API server, follow these steps:

1. Create a directory named `Server` to hold the server code.
2. Open a terminal and navigate to the `Server` directory using the `cd` command.
3. Run `npm init` to initialize the project and create a `package.json` file. You can modify the entry point and author fields if needed.
4. Open Visual Studio Code and open a terminal for the `Server` directory.
5. Create a file named `server.js` inside the `Server` directory.
6. Install the required dependencies by running the following commands:
    - `npm i express` to install Express.
    - `npm i cors` to install CORS.
    - `npm install mssql msnodesqlv8` to install the MSSQL and MSNodeSQLv8 packages.
7. If you want to run the server in development mode, install `nodemon` by running `npm i nodemon --save-dev`.
8. Add the following scripts to the `package.json` file:
    ```
    "scripts": {
      "start": "node server",
      "dev": "nodemon server"
    }
    ```
    The `start` script will run the server using the `node` command, while the `dev` script will use `nodemon` for automatic restarts during development.

That's it! You're now ready to start building your Driver Management API.
