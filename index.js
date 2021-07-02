const  bodyParser  = require('body-parser');
const express = require('express')
const app = express()
const port = 5000;
// app.use(bodyParser.url encoded({extended:false}))
app.use(express.json())
// app.use(express.static('public'))
app.get('/', (req, res) => {
  res.send("hello");
})
app.post('/api', function (req, res) {
  res.send(`Got a POST request ${req.body}`)
  console.log(req.body)
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})