const jwt = require('jsonwebtoken');
const knex = require("../db/knex.js");
const user_controller = require('../controllers/user_controller');
const org_controller = require('../controllers/org_controller');
const goal_controller = require('../controllers/goal_controller');
const reward_controller = require('../controllers/reward_controller');


module.exports = function(app){

  app.post('/login', user_controller.login);
  app.post('/register', user_controller.register);

  app.get('/verifytoken', verifyToken);

  app.use(verifyTokenMiddleware);
  
  app.get('/organization', org_controller.renderAll);
  app.get('/organization/:org_id/verifyadmin', verifyAdmin);
  app.get('/organization/:org_id', org_controller.renderOne);
  
  app.post('/organization/accept_invitation', user_controller.acceptInvite);
  app.get('/organization/:org_id/create_invitation', verifyAdminMiddleware, user_controller.createInvite);

  app.post('/organization', org_controller.addOne);
  app.delete('/organization/:org_id', verifyAdminMiddleware, org_controller.removeOne);
  app.patch('/organization/:org_id', verifyAdminMiddleware, org_controller.editOne);

  app.post('/organization/:org_id/goals/', verifyAdminMiddleware, goal_controller.addOne);
  app.delete('/organization/:org_id/goals/:goal_id', verifyAdminMiddleware, goal_controller.removeOne);
  app.put('/organization/user_goals/:user_goal_id', goal_controller.editOneAsUser);
  app.patch('/organization/:org_id/admin_goals/:goal_id', verifyAdminMiddleware, goal_controller.editOneAsAdmin);

  app.post('/organization/:org_id/rewards', verifyAdminMiddleware, reward_controller.addOne);
  app.delete('/organization/:org_id/rewards/:reward_id', verifyAdminMiddleware, reward_controller.removeOne);
  app.patch('/organization/:org_id/rewards/:reward_id', verifyAdminMiddleware, reward_controller.editOne);
  
}

function verifyAdmin(req, res, next){
  knex('user_has_org')
  .where('org_id', req.params.org_id)
  .where('user_id', req.decoded.user.id)
  .where('isAdmin', true)
  .then((response) => {
    if(response[0].isAdmin){
      res.json({ isAdmin: true })
    }else{
      res.json({ message: 'This action requires admin privelege.' })
    }
  }).catch((err)=>{
    res.json({ message: 'This organization does not exist.' })
  })
}

function verifyAdminMiddleware(req, res, next){
  knex('user_has_org')
  .where('org_id', req.params.org_id)
  .where('user_id', req.decoded.user.id)
  .where('isAdmin', true)
  .then((response) => {
    if(response[0].isAdmin){
      next();
    }else{
      res.json({ message: 'This action requires admin privelege.' })
    }
  }).catch((err)=>{
    res.json({ message: 'This organization does not exist.' })
  })
}

function verifyTokenMiddleware(req, res, next) {
  let token = req.headers['token'];
  // if token exists
  if (token) {
    // checks if it matches with our secret key
    jwt.verify(token, 'secretkey', (err, decoded) => {
      if (err) {
        res.json({
          message: 'Failed to authenticate'
        })
      }
      req.decoded = decoded;
      next();
    })
  } else {
    res.json({
      message: 'Failed to authenticate'
    })
  } 
  
}

function verifyToken(req, res, next) {
  let token = req.headers['token'];
  // if token exists
  if (token) {
    // checks if it matches with our secret key
    jwt.verify(token, 'secretkey', (err, decoded) => {
      if (err) {
        res.json({
          message: 'Failed to authenticate'
        })
      }
      res.send('true');
    })
  } else {
    res.json({
      message: 'Failed to authenticate'
    })
  }
}

