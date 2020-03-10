var express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/img/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

var upload =  multer({ storage: storage })

var pedido = upload.array('fileselect');


// var pedido = upload.array('fileselect');



router.post('/add', pedido, (req, res) => {

  console.log(req.files);
  console.log(req.body.name);

    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    }
    else if (!req.files) {
      return res.send('Please select an image to upload');
    }

    let result = [ { name : req.body.name }];
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
      result.push( { file : req.files[index].path.replace("public","") });
    }

    res.send(result);


});

module.exports = router;
