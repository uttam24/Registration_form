const express = require("express");
const app = express();
require("./db/db");
const path = require("path");
const template_path = path.join(__dirname, '../template/views')
const empCollection = require("./model/model")
app.set('view engine', 'hbs');
app.set('views', template_path);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const port = 4500
// app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.render('signup')
})
app.post("/empdata", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword
        if (password === cpassword) {
            const empDatas = new empCollection({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                cpassword: req.body.cpassword,
            })
            const postData = await empDatas.save();
            res.send(postData);


        }
        else {
            res.send("password are not matching")
        }
    } catch (error) {
        res.send(error)
    }
})
app.get("/login", (req, res) => {
    res.render('login')
})
app.post("/loginPage", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.loginpassword;

        const getEmail = await empCollection.findOne({ email: email })

        const passReal = await bcrypt.compare(password, getEmail.password)

        if (passReal) {
            res.render("index")
        } else {
            res.send("password are not matching")
        }
    } catch (error) {
        res.send(error)
    }
})

// const passwordData = async (pass) => {
//     const passData = await bcrypt.hash(pass, 10);
//     console.log(passData);

//     const decodePassword = await bcrypt.compare(pass, passData);
//     console.log(decodePassword)
// }
// passwordData("ankit123")
// const createToken = async () => {
//     const token = jwt.sign({ _id: "6949659496" }, "mynameisuttamfmsdfjkiuoiuotjlkjdsflkjlksdjfoiuowerlkewj");
//     console.log(token)
// }

// createToken();
app.listen(port, () => {
    console.log(`my name is uttam ${port}`);
})