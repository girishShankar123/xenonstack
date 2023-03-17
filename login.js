const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const alert = require('alert');
const bcrypt = require('bcrypt');
const session = require('express-session');
const mongodb=require('mongodb')


const app = express();

app.set('view engine', 'ejs')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1/user_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const userSchema = new mongoose.Schema({
    email: String,
    pass: String,
    image:String,
    fname:String,
    lname:String,
    phone: Number,
    pass: String,
    address: String
});


const Form = mongoose.model('Form', userSchema);
app.use(express.static('public'));


app.post('/login', async (req, res) => {
    try {
        const { email, pass } = req.body;
        const form = await Form.findOne({email, pass});
        console.log(form)
   
            if(form){
            res.redirect('contact.html')
            
           
        } else {
          alert("wrong password")
        // res.send("Wrong Password")
        }
    } catch (error) {
        console.log(error);
        res.redirect('/error.html');
    }
    
});
app.get('/login',async function(req, res) {
    const id = req.params.id;
    const form1 = await Form.findOne();
    // console.log(form1.id)
    res.render('login', { form1});
    });
app.put('/login' ,async(req, res)=>{
    const id = req.params.id;
    console.log(id)
    const form1 = await Form.findOne();
    console.log(form1.id)
    const email = req.body.email;
    const phone = req.body.phone;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      const form1=updateOne({_id: new ObjectId(id)}, {$set: {name: email, age: phone}}, function(err, result) {
        console.log(form1)
        if (err) throw err;
        res.render('profile',{form1})
        console.log('1 document updated');
        db.close();
        res.redirect('/');
      });
    })
})



// Start the server
app.listen(5000, () => {
    console.log('Server started on port 5000');
});
