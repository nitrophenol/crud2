const express = require('express')
const mongoose = require('mongoose')
const hbs = require('hbs')
const app = express()
const path = require('path')
const schema = require('./models/schema')
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
const userschema = require('./models/schema')
require('dotenv').config()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set('view engine', 'hbs')
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})  
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'))

//routes


// delete a product

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/create', (req, res) => {
    res.render('create')
})
app.get('/read/', async (req, res) => {
    const id=req.query.id
    console.log("hit")
    console.log(id)
    userschema.findOne({id:id}).then((result) => {
        console.log(result)
        if(result){
            console.log("found")
        }
        else{
            res.send("invalid id")
        }
    }).catch((err) => {
        res.send(err)
    })
    try {
        const product =  await userschema.findOne({id: id})
        res.status(200).render('read', {product})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/delete/', (req, res) => {
    const id=req.query.id
    console.log(id)
    userschema.findOne({id:id}).then((result) => {
        console.log(result)
        if(result){
            console.log("found")
        }
        else{
            res.send("invalid id")
        }
    }).catch((err) => {
        res.send(err)
    })
    userschema.findOneAndDelete({id:id}).then((result) => { 
        console.log(result)
        res.send("deleted")
    }).catch((err) => {
        console.log(err)
    })
})
app.post('/create', (req, res) => {
    const obj=req.body
    userschema.create(obj);
    console.log(obj)
    res.send("created")
})
app.post('/update/', async (req, res) => {
    const id=req.body.id
    console.log(id +"id")
    const obj=req.body
    console.log(id)
    console.log(obj)
    userschema.findOne({id:id}).then((result) => {
        console.log(result)
        if(result){
            console.log("found")
        }
        else{
            res.send("invalid id")
        }
    }).catch((err) => {
        res.send(err)
    })
      userschema.findOneAndUpdate({id:id},{name:obj.name,age:obj.age,class:obj.class,id:obj.id}).then((result) => {
        console.log(result)
        res.send("updated")
    }).catch((err) => {
        console.log(err)
    })
})

app.listen(8000, () => {
    console.log('Server is running on port 3000')
}
)