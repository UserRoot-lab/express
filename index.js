const express = require('express')
const app = express()
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');







mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((db) => console.log("db is connected"))
    .catch((err) => console.log(err));









app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Localhost en el puerto ${port}`));



app.use(morgan('dev'));


app.get('/users', async (req, res) => {
    const users = await User.find({});

    try {
        res.send(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/register', async (req, res) => {
    const user = new User(req.body);
  
    try {
      await user.save();
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  });


  app.get('/users', async (req, res) => {
     await User.find({});

    try {
        res.json(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/user', async (req, res, next) => {
    const {name,password} = req.body;
    await User.find({name});
    await User.find({password})
   
    try {
       console.log(req.body);
       
   } catch (err) {
       res.status(500).send(err);
   }
});




const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const User = mongoose.model("User", UserSchema);