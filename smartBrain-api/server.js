
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');
const register = require('./Controllers/register')
const signin = require('./Controllers/signin')
const image = require('./Controllers/image')
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'kpriyansh34',
        database: 'smartbrain'
    }
});



const app = express();

app.use(express.json());
app.use(cors());



app.post('/register',(req,res)=>{register.handleRegister(req,res,bcrypt,db)})

app.put('/image', (req, res) => {image.handeImage(req,res,db)});

app.post('/signin', (req, res) => {signin.handleSignin(req,res,bcrypt,db)});

app.listen(3002);