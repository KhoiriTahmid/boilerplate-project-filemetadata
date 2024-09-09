var express = require('express');
var cors = require('cors');
require('dotenv').config()
//import {multer} from multer
const multer = require("multer")

var app = express();
const disk = multer.diskStorage({
  destination:(req, file, cb)=>{cb(null,__dirname+"/data")},
  filename:(req,file,cb)=>{cb(null,file.originalname)}
})

const upload = multer({storage:disk})

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single("upfile"), (req,res)=>{
  res.json({
    name:req.file.filename,
    type:req.file.mimetype,
    size:req.file.size
  })
})




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
