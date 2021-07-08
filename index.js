const express = require('express')
const app = express()
const port = 5000;
app.use(express.urlencoded({extended:false}))
app.use(express.json())
// app.use(express.static('public'))
app.get('/', (req, res) => {
  res.send("hello");
})
app.post('/api', function (req, res) {
  // res.send("post request")
  // {profile_pk: req.body.profile_pk , li_at: req.body.li_at}
  console.log("post here", req.body)
  res.send( req.body)
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

