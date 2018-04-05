const express = require('express')
const mongodb = require('mongodb')
const engines = require('consolidate')
const bodyparser = require('body-parser')

const app = express()
const mongoClient = mongodb.MongoClient

//include the html engine
app.engine('html', engines.nunjucks)
app.set('view engine', 'html')
app.set('views', `${__dirname}/views`)

//parsing form data
app.use(bodyparser.urlencoded({extended:true}))

app.get('/',(req, res)=>{
    res.render('form',{}) 
})

app.post('/movie',(req, res)=>{
    //get the form data
    let title = req.body.title
    let name = req.body.name
    let rating = req.body.rating

    //connect to the mongo client
    mongoClient.connect('mongodb://localhost:27017', (err, client)=>{
        let db = client.db('video')
        db.collection('movie').insertOne({'title':title,'name':name,'rating':rating},(err, result)=>{
            client.close()
            res.send(result.insertedId)
        })
    })
})

app.listen(3003,()=>{
    console.log('server stared on 3003')
})



