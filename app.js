const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
mongoose.connect('mongodb://127.0.0.1/user_management', { useNewUrlParser: true, useUnifiedTopology: true });


const formSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    image: String,
    email: String,
    phone: Number,
    pass: String,
    address: String
});
app.use(express.static('public'));

const Form = mongoose.model('Form', formSchema);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.post('/submit', upload.single('image'), async (req, res) => {
    const { fname, lname, pass, email, phone, address } = req.body;
    const imagePath = req.file.path.replace('public/uploads');
    const { filename } = req.file;

    const form = new Form({
        fname,
        lname,
        email,
        phone,
        pass,
        address,
        image: filename
    });

    await form.save();
    console.log(form)
    const form1 = await Form.find({});
   res.redirect('login.html')
});


// mongoose.model('Form', userSchema);

app.use(express.static('public'));




// start the server
app.listen(5000, () => console.log('Server started on port 5000'));
