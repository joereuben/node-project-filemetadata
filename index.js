var express = require('express');
var cors = require('cors');
let bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }).single("upfile")

require('dotenv').config()

var app = express();
//Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', function (req, res) {
  upload(req, res, (err) => {
    if(err) {
      res.status(400).send("Something went wrong!");
    }
    // console.log(req.file)
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
  });
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
