'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({strict:false});
const expressJWT = require('express-jwt');
const morgan = require('morgan');
const fs = require('fs');
const customConfig = JSON.parse(fs.readFileSync('./config/secret.json'));
const routes = require('./config/routes');
app.use(morgan('dev'));
app.use(cors());
app.use(jsonParser);
app.use(expressJWT({ secret: customConfig.jwtSecret })
  .unless({ path: ['/user-sign-in', '/user-show', '/user-sign-up', '/user-verify'] }), routes
);

app.use((error, request, response, next) =>{
   response.status(500).json({status:'500: Internal Server Error'});
});
// app.use((error, request, response, next) => {
//   console.error(error.stack);
//   response.status(500).send({error:'Server error internal'});
//
// });

app.listen(3000, (() => {
  console.log('3000!');
}));
