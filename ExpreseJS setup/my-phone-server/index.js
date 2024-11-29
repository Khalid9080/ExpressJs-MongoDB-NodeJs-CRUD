

const express = require('express')
const cors= require('cors')
const app = express()
const port = 5000
const post = require('./post.json')

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World! commin gsoon')
})

app.get('/post', (req, res) => {
    res.send(post)
})

//  request with parameter id string k convert kore int a nite hobe

app.get('/post/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    console.log('i need data for id',id);
    const posts = post.find(posts=>posts.id==id) || {};
    res.send(posts)
})

app.listen(port, () => {
  console.log(`my phone comming soon ${port}`)
})