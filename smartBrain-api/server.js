
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');
const register = require('./Controllers/register')
const signin = require('./Controllers/signin')
const image = require('./Controllers/image')
// const db = knex({
//     client: 'pg',
//     connection: {
//       host : 'dpg-cf3s80h4rebfa0q81av0-a',
//       port : '5432',
//       user : 'smartbrain_s3rm_user',
//       password : 'QioUDsX68yefnPekoW69VOhGRV7SRWZm',
//       database : 'smartbrain_s3rm'
//     }
//   });
const db = knex({
    client: 'pg',
    connection: 'postgres://smartbrain_s3rm_user:QioUDsX68yefnPekoW69VOhGRV7SRWZm@dpg-cf3s80h4rebfa0q81av0-a.oregon-postgres.render.com/smartbrain_s3rm',
    searchPath: ['knex', 'public'],
  });



const app = express();

app.use(express.json());
app.use(cors());



app.post('/register',(req,res)=>{register.handleRegister(req,res,bcrypt,db)})

app.put('/image', (req, res) => {image.handeImage(req,res,db)});

app.post('/signin', (req, res) => {signin.handleSignin(req,res,bcrypt,db)});

app.get('/',(req, res)=>{
    res.send("Welcome")
})

app.listen(3000, () =>{
    console.log("Running on port 3000")
});
