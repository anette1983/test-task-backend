# A NodeJS REST API application with Express and PostgreSQL

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Supported routes](#supported-routes)
- [Working with the database](working-with-the-database)

## Introduction

This is a NodeJS REST API application developed using such technologies as: NodeJS, Express framework, PostgreSQL, node-postgres, Docker, docker-compose, Joi, Morgan, nodemon. It's a functioning API server that runs on Node.js and is hooked up to an active PostgreSQL database.
Please, read carefully the installation and usage sections before running the project. 

## Installation

To use this project locally, please follow these steps:

**Step 1: Install Docker and Docker Compose**

Make sure Docker and Docker Compose are installed on your computer.

- [Install Docker](https://docs.docker.com/get-docker/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)

**Step 2: Clone the Repository**

```
git clone https://github.com/anette1983/test-task-backend.git
```

Then navigate to the project's directory:

```
cd test-task-backend
```

**Step 3. Install the project dependencies using npm:**

```
npm install
```

**Step 4: Start the Containers**

Start the containers using Docker Compose:

```
docker-compose up -d
```

**Step 5: Access the Application**

Your application will be available at http://localhost:3000/api/users. You can change the port in the docker-compose.yml file if needed.

## Working with the Database

To access the PostgreSQL database, use the following connection parameters:

```
host: "db"
database: "postgres",
user: "postgres",
password: "6528",
```

To get docker image with the current database run:

```
docker pull anette1983/test-task-backend:latest
```

To download this application docker image run:

```
docker pull anette1983/test-task-backend-server:latest
```

if you prefer to create **new database from scratch** using official postgres image, please don't forget to run this commands to initialize the database:

Execute the database image:

```
docker exec -it test-task-backend-db-1 psql -U postgres
```

*Replace "test-task-backend-db-1" with your DB container name, and "postgres" with your postgres user name if needed.*

```
postgres=# CREATE TYPE gender AS ENUM ('male', 'female', 'other');
```

```
postgres=# CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(50) NOT NULL,
email VARCHAR(100) NOT NULL,
role VARCHAR(20) DEFAULT 'USER',
dateCreate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
profileId SERIAL,
FOREIGN KEY (profileId) REFERENCES profiles(id)
);
```

```
postgres=# CREATE TABLE profiles (
id SERIAL PRIMARY KEY,
firstName VARCHAR(50) NOT NULL,
lastName VARCHAR(100) NOT NULL,
state gender
);
```

**The order is important!**


To list all the tables in the current schema run:

```
postgres=# \dt
```

To see all records in one table:

```
postgres=# select \* from <tableName>
```

To see all users' information in the terminal open new terminal and run:

```
curl localhost:3000/api/users
```

Adding new user through the command-line interface with SQL queries:

```
INSERT INTO profiles (firstName, lastName, state)
VALUES ('test', 'test', 'male/female/other');
INSERT INTO users (username, email, role)
VALUES ('test', 'test@mail.com', 'ADMIN/USER/SUPERUSER/MODERATOR');
```

**The order is important!**

## Usage

To use the project, follow these steps:

1. Ensure that you have completed the installation steps mentioned above.

2. Customize the project's configuration according to your requirements. You may need to modify configuration files or environment variables.

3. Access the application by navigating to `http://localhost:3000/api/users` in your web browser.

4. To test the CRUD operations, please use "Postman" application or similar. 

## Supported routes

- `GET /api/users` Returns an array of all users from database in JSON format with status 200. You can add "role" parameter into query params to get all users with needed role. Please use roles from the role list only: ["user", "admin", "moderator", "superuser"].
- `GET /api/users/:id` If there is such an id, returns the user object in JSON format with status 200. If there is no such id, returns json {"error": "User with id = id not found"} and 400 status.
- `POST /api/users` Gets body in {username, firstName, lastName, email, role, state} format. All fields are required. Please use roles from the role list only: ["user", "admin", "moderator", "superuser"], and state from the gender list: ["male", "female", "other"]. If there are no required fields in body, returns JSON {"message": "missing required field name field"} with status 400. If everything is fine with body, saves the user data into the database in two connected tables: "users" and "profiles". Returns an object {"user":[{id}], "profile": [{id}]} with status 201.
- `DELETE /api/users/:id` If there is such an id, it returns message {"User deleted with ID: id"} with status 200. If there is no such id, returns JSON {"error": "User with id = id not found"} with status 400.
- `PUT /api/users/:id` Gets the id parameter. Gets body in JSON format, updating all of the fields. If there is no body, returns JSON {"message": "missing required fields"} with status 400. If everything is fine with the body, updates the user info in the database. It returns a message "User and Profile modified with ID: id" with a status of 200. Otherwise, returns JSON { "error": "User with id = id not found"} and 400 status.

Thank you for your interest in this project! If you have any questions or need further assistance, please feel free to contact me.
