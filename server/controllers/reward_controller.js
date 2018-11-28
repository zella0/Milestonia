const knex = require("../db/knex.js");

module.exports = {
  addOne: (req, res) => {
    knex('reward')
    .insert({
      reward_name: req.body.reward_name,
      pts_required: req.body.pts_required,
      org_id: req.params.org_id
    }, '*')
    .then((postBody)=>{
      res.json({ reward: postBody })
    })
  },
  removeOne: (req, res) => {
    knex('reward')
    .where('id', req.params.reward_id)
    .del()
    .then(()=>{
      res.json({ message: 'Reward has been successfully deleted!' })
    }).catch((err)=>{
      res.json({ message: 'Failed to delete selected reward.' })
    })
  },
  editOne: (req, res) => {
    knex('reward')
    .where('id', req.params.reward_id)
    .update({
      reward_name: req.body.reward_name,
      pts_required: req.body.pts_required
    })
    .then(()=>{
      res.json({ message: 'Reward has been successfully updated!' })
    }).catch((err)=>{
      res.json({ message: 'Failed to update selected reward.' })
    })
  },
}