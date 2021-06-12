const express = require('express')
const fs = require('fs')
const uuid = require('uuid')
const app = express()
const admin = require('./fb/admin')
const cors = require('cors')


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
//setup ejs
app.set('view engine', 'ejs')
app.use(cors({ origin: true }))

//router start

//show all the user
app.get('/', (req, res) => {
    const data = fs.readFileSync("./db/db.json", "utf-8")
    res.render("index", { data: data ? JSON.parse(data) : [] })
})

//store the registration token
app.post('/token', (req, res) => {
    const { name, token } = req.body
    console.log("new=", name, token);
    const path = "./db/db.json"
    const data = fs.readFileSync(path, "utf-8")
    const arr = data ? JSON.parse(data) : []
    arr.push({
        id: uuid.v4(), name, token
    })
    fs.writeFileSync(path, JSON.stringify(arr))
    res.send({ msg: "token added" })
})
//send push notification
app.get('/send/:token', (req, res) => {
    const { token } = req.params
    console.log(token);
    let payload = {
        data: {
            title: "data title",
            body: "data body",
            type: "crud"
        }
    };
    let options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    // notification: {
    //     title: "notification title",
    //         body: "notification body"
    // },

    admin.messaging().sendToDevice(token, payload, options)
        .then(function (response) {
            console.log("Successfully sent message:", response);
            res.send(response)
        })
        .catch(function (error) {
            console.log("Error sending message:", error);
            res.send(error)
        });
})

app.listen(2727, () => {
    console.log(`app running on port 2727 🚀`)
})