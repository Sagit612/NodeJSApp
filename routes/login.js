var express = require('express');
var router = express.Router();
var authen = require('../model/authenticated')
var getTable = require('../model/tableDisplay')
/* GET login listing. */
router.get('/', function(req, res, next) {
  res.render('login', {message: 'Login'});
});

// router.post('/', async function(req, res, next) {
//     var uname = req.body.username
//     var passwd = req.body.password
//     var auth = await authen(uname, passwd)
//     if (auth==true){
//       var tableString = await getTable(uname)
//       // console.log(tableString.rows[0].role)
//       res.render('user.ejs', 
//       {
//         message: 'Login successfully',
//         table: tableString
//       })
//     }else{
//       res.render('login', {message: 'wrong username and password, please enter again'})
//     }
// });

module.exports = router;