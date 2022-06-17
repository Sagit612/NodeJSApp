var express = require('express');
var router = express.Router();
var authen = require('../model/authenticated')

/* GET login listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', async function(req, res, next) {
    var uname = req.body.username
    var passwd = req.body.password
    var auth = await authen(uname, passwd)
    if (auth==true){
      res.render('user.ejs', {message: 'hello'})
    }else{
      res.send('123')
    }
});

module.exports = router;