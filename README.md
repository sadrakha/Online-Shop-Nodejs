# SHOP API Nodejs app
This app is a web application that uses the Node.js runtime environment and the Express framework to create a RESTful API for an online shop. The app allows users to view and order products , which are organized into categories. The app also supports user authentication and authorization, so that different users can have different roles and permissions to access and modify the data. The app uses MySQL database to store the customer, products, category,sub category, orders, former orders, favourites, and user information. The app also uses various middleware functions to handle tasks such as logging, error handling, validation, and authentication.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need to install npm modules for running this app.
```
npm i
```
or 
```
npm install
```
### Run

1-clone this repo

2-To run this app, set your variables in .env file at the root of the project

-   PORT

-   SQL_DB

-   SQL_USER

-   SQL_PASS

-   SQL_PORT

-   JWT_KEY

-   JWT_EXPIRE_TIME
## example:
PORT=3001
SQL_DB='small-crm'
SQL_USER='root'
SQL_PASS='admin'
SQL_PORT='3306'
JWT_KEY='secretiscecret'
JWT_EXPIRE_TIME='2d'

3-Then you need to start your SQL database and after that you're ready to start the project.

```
npm start
```


## Running the tests

Now you can run this project on your Postman.

For example for signUp you should use :

```
localhost:3001/signUp
```
inputs you need:
```
userName
email
password
comfirmPass
profile
address
phone
age
```
or if you already have an user:
```
localhost:3000/logIn
```

## Built With

* Nodejs
* express
* MySQL
