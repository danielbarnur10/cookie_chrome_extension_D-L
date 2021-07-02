const express = require('express')
const app = express()
const port = 5004;
app.use(express.urlencoded({extended:false}))
app.use(express.json())
// app.use(express.static('public'))
app.get('/', (req, res) => {
  res.send("hello");
})
app.post('/api', function (req, res) {
  res.send({cookie: req.body.cookie})
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

