const express = require("express");
const cors = require("cors");
const DotEnv = require('dotenv');
const bodyParser = require("body-parser");
const mongo = require("mongodb");
const multer = require("multer");
const path = require('path');
const url = require("url")



const app = express()

DotEnv.config()

var MongoClient = mongo.MongoClient;


const port = process.env.PORT || 5000;

var db;


app.use(cors())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/profile', express.static('upload/images'))

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage: storage
})

app.post('/upload', upload.single('profile'), (req, res) => {
    res.json({ data: `${process.env.PORT}/profile/${req.file.filename}` })
})

app.post("/createpost", (req, res) => {
    db.collection('posts').insertOne(req.body, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.get("/post", (req, res) => {
    db.collection('posts').find({}).toArray((err, result) => {
        if (err) throw err;

        res.send(result)
    })
})

app.post("/postcomment", (req, res) => {

    db.collection('posts').updateOne(
        { _id: new mongo.ObjectId(req.body.id) },
        { $push: { "comments": req.body.comment } }
    )

})


if (process.env.NODE_ENV === "production") {
    app.use(express.static('/frontend/build'))

    // app.get("*", (req,res) => {
    //     res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    // })
}


MongoClient.connect(process.env.MONGO_URI, (err, client) => {
    if (err) console.log(err);
    db = client.db('Blog-api');
    app.listen(port, () => {
        console.log(`port connect`)
        
    })
})


