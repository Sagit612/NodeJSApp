const { query } = require('express');
var express = require('express');
var router = express.Router();
var authen = require('../model/authenticated')
var getTable = require('../model/tableDisplay')
const url = require('url')
const deleteAction = require('../model/DeleteFunction')
const addAction = require('../model/AddFunction')
const editAction = require('../model/EditFunction')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/', async function(req, res, next) {
  var uname = req.body.username
  var passwd = req.body.password
  var auth = await authen(uname, passwd)
  if (auth==true){
    var tableString = await getTable(uname)
    // console.log(tableString.rows[0].role)
    res.render('user.ejs', 
    {
      message: 'Login successfully',
      table: tableString
    })
  }else{
    res.render('login', {message: 'wrong username and password, please enter again'})
  }
});
router.post('/add',async (req,res,next)=>{
  console.log(req.body)
  const queryObject = url.parse(req.url, true).query
  var user = queryObject['user']
  await addAction(req.body)
  var tableString = await getTable(user)
  res.render('user', {
    message: "Welcome to ATN\n",
    table: tableString
   })
})
router.get('/delete', async (req,res,next)=>{
  const queryObject = url.parse(req.url, true).query
  var id = parseInt(queryObject['id'])
  var user = queryObject['user']
  await deleteAction(id)
  var tableString = await getTable(user)
  res.render('user', {
      message: "Welcome to ATN\n",
      table: tableString
     })
})
router.post('/edit', async (req,res,next)=>{
  console.log(req.body)
  const queryObject = url.parse(req.url, true).query
  var id = parseInt(queryObject['id'])
  var user = queryObject['user']
  await editAction(id, req.body)
  var tableString = await getTable(user)
  res.render('user', {
    message: "Welcome to ATN\n",
    table: tableString
   })
})


module.exports = router;
