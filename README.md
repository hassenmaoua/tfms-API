# TFMS API

> A REST API to manage the data of TFMS Solutions

<p align="center">
  <a href="#about-the-project">About The Project</a> •
  <a href="#installation">Installation</a> •
  <a href="#modules">Modules</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#license">License</a>
</p>

## About The Project

An application programming interface that adheres to the constraints of REST architectural style and enables interaction with RESTful web services

### Build with

[<img alt="NodeJs" src="https://img.shields.io/badge/node-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">](https://nodejs.org/en/)
[<img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white">](https://www.mongodb.com/)

### Development Environment

[<img alt="VS Code" src="https://img.shields.io/badge/VS%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white">](https://code.visualstudio.com/)

### Link to API

> [lwm-api.herokuapp.com](https://lwm-api.herokuapp.com)

## Installation

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. Also you'll need download [MongoDB](https://www.mongodb.com/try/download/community) document-oriented database on your computer.

From your command line:

- Clone this repository

```bash
git clone https://github.com/hassenmaoua/TFMS-API
```

- Go into the repository

```bash
cd TFMS-API
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

> `cors` : [Cors](https://www.npmjs.com/package/cors) is a package for providing a Connect/Express middleware that can be used to enable CORS with various options

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
   URI=mongodb://127.0.0.1/{Your DataBase Name}
   PORT={Any Number}
   JWT_SECRET={Your Secret Key}
   JWT_REFRESH_SECRET={Your Secret Key}
   ```

3. Start Server Application

   ```sh
   npm run dev
   ```

## License

Hassen Maoua - Gmail [hassenmaoua07@gmail.com](https://mail.google.com/mail/?view=cm&fs=1&to=hassenmaoua07@gmail.com&su=About+TFMS+API)

---

[<img alt="LinkedIn" src="https://img.shields.io/twitter/url?color=green&label=Hassen%20Maoua&logo=linkedin&style=social&url=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fhassen-maoua">](https://linkedin.com/in/hassen-maoua) &nbsp;&middot;&nbsp; [<img alt="GitHub" src="https://img.shields.io/twitter/url?label=Hassen%20Maoua&logo=github&style=social&url=https%3A%2F%2Fgithub.com%2Fhassenmaoua">](https://github.com/hassenmaoua) &nbsp;&middot;&nbsp; [<img alt="Facebook" src="https://img.shields.io/twitter/url?label=Hassen%20Maoua&logo=facebook&style=social&url=https%3A%2F%2Ffacebook.com%2Fhassen.maoua">](https://facebook.com/hassen.maoua)
