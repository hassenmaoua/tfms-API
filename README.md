# LMW API

> A REST API to manage the data of Lathe Mill Workshop

<p align="center">
  <a href="#about-the-project">About The Project</a> •
  <a href="#installation">Installation</a> •
  <a href="#modules">Modules</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#license">License</a>
</p>

## About The Project

An application programming interface that adheres to the constraints of REST architectural style and enables interaction with RESTful web services

![screenshot](screenshot.png)

## Installation

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. Also you'll need download [MongoDB](https://www.mongodb.com/try/download/community) document-oriented database on your computer.

From your command line:

- Clone this repository

```bash
git clone https://github.com/hassenmaoua/LMW-API
```

- Go into the repository

```bash
cd LMW-API
```

- Install Dependencies and `node_modules`

```bash
npm install
```

## Modules

> `express` : [Express](https://expressjs.com/) is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

> `mongoose` : [Mongoose](https://mongoosejs.com/) is a Node. js-based Object Data Modeling (ODM) library for MongoDB.

> `jsonwebtoken` : [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken) is an open standard for securely transferring data within parties using a JSON object.

> `cookie-parser` : [Cookie Parser](https://www.npmjs.com/package/cookie-parser) is a middleware which parses cookies attached to the client request object.

> `cors` : [Cookie Parser](https://www.npmjs.com/package/cors) is a package for providing a Connect/Express middleware that can be used to enable CORS with various options

> `multer` : [Multer](https://www.npmjs.com/package/multer) is a middleware for handling multipart/form-data , which is primarily used for uploading files

## How To Use

Here are the instructions for setting up your project locally..
To get a local running you may follow these simple steps.

1. Install Environment Variables and create `.env` file

   ```sh
   npm i --save-dev dotenv
   ```

2. Create this variables inside `.env`

   ```sh
   MONGO_URI=mongodb://127.0.0.1/{Your DataBase Name}
   API_PORT={Any Number}
   TOKEN_KEY={Random String}
   ```

3. Inside `package.json` Change `"scripts"` to

   ```json
    "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js"
    }
   ```

4. Start Server Application

   ```sh
   node index.js
   ```

## License

Hassen Maoua - Gmail [hassenmaoua07@gmail.com](https://mail.google.com/mail/?view=cm&fs=1&to=hassenmaoua07@gmail.com&su=About+LMW+API)

---

> LinkedIn [Hassen Maoua](https://linkedin.com/in/hassen-maoua-215683251) &nbsp;&middot;&nbsp;
> GitHub [@hassenmaoua](https://github.com/hassenmaoua) &nbsp;&middot;&nbsp;
> Facebook [@hassen-maoua](https://facebook.com/hassen.maoua)
