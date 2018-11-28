const knex = require("../db/knex.js");
const hasher = require('../config/hasher');
const jwt = require('jsonwebtoken');

module.exports = {
  login: (req, res) => {
    knex('user')
      .where('email', req.body.email)
      .then((user) => {
        if (user[0]) {
          hasher.check(user[0], req.body)
            .then((isMatch) => {
              // if user is valid
              if (isMatch) {
                let token = jwt.sign({
                  user: user[0]
                }, 'secretkey', {
                  expiresIn: 86400
                });
                res.json({
                  token
                });
              } else {
                res.json({
                  message: 'Invalid Email/Password'
                });
              }
            })
        } else {
          res.json({
            message: 'Invalid Email/Password'
          });
        }
      })
  },
  register: (req, res) => {
    hasher.hash(req.body)
    .then((user)=>{
      knex('user')
      .insert(user)
      .then(()=>{
        res.json({
          message: 'User has been sucessfully created!'
        });
      }).catch((err)=>{
        let errMsg;
        if(err.constraint.includes('email_unique')){
          errMsg = 'Email already exists!'
        }else if(err.constraint.includes('username_unique')){
          errMsg = 'Username already exists!'
        }
        res.json({ 
          err: errMsg
        });
      })
    })
  },
  createInvite: (req, res) => {
    let token = jwt.sign({
      org_id: req.params.org_id
    }, 'inv', {
      expiresIn: 600
    });
    res.json({ invite_code: token})
  },
  acceptInvite: (req, res) => {
    jwt.verify(req.body.invitation_code, 'inv', (err, decoded) => {
      if (err) {
        res.json({
          message: 'Invalid code!'
        })
      }

      let promiseArr = [];
      console.log(decoded);
      console.log(req.decoded);
      // register the new user to the current org
      knex('user_has_org')
      .insert({
        isAdmin: false,
        user_id: req.decoded.user.id,
        org_id: Number(decoded.org_id)
      }).catch(()=> res.json({ message: 'Invalid user' }))
      .then(()=>{
      // generate all existing goals to the new user
        return knex('goal')
        .then((goalsReponse)=>{
          console.log(goalsReponse, 'asf')
          goalsReponse.map((goalItem)=>{
            knex('user_goals_progress')
            .insert({
              user_id: req.decoded.user.id,
              goal_id: goalItem.id
            }).catch((err)=> console.log(err))
            .then(()=>{
              res.json({
                 message: 'You have successfully joined!',
                 org_id: Number(decoded.org_id)
             }).catch((err) => res.json({
               org_id: Number(decoded.org_id)
             }))
            })
          })
        })
      }).catch(() => res.json({
        message: 'You have failed to joined (already joined)'
      }))
    })
  }
}
