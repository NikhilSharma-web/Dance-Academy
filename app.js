const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 8000;

app.use('/static', express.static('static'))
app.use(express.urlencoded())

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res) => {
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/about', (req, res) => {
    const params = { }
    res.status(200).render('about.pug', params);
})
app.get('/services', (req, res) => {
    const params = { }
    res.status(200).render('services.pug', params);
})
app.get('/classInfo', (req, res) => {
    const params = { }
    res.status(200).render('classInfo.pug', params);
})
app.get('/contact', (req, res) => {
    const params = { }
    res.status(200).render('contact.pug', params);
})



app.post('/contact', (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const address = req.body.address;
    const desc = req.body.desc;

    // Creating a unique filename using the user's name and timestamp
    const fileName = `user_${name.replace(/\s+/g, '_')}_${Date.now()}.txt`;
    const filePath = path.join(__dirname, 'userdata', fileName);

    const outputToWrite = `The name of the client is ${name}, and the contact number is :${phone}, E-mail id: ${email}, residing at ${address}. More about them: ${desc}`;

    // Ensure the 'userdata' directory exists
    if (!fs.existsSync('userdata')) {
        fs.mkdirSync('userdata');
    }

    // Write the user data to a unique file
    fs.writeFileSync(filePath, outputToWrite);

    const params = { 'message': 'Your Form has been Submitted Successfully' };
    res.status(200).render('index.pug', params);
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})