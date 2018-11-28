const knex = require("../db/knex.js");

module.exports = {
  addOne: (req, res) => {
    knex('task')
    .insert({
      task_name: req.body.task_name,
      status: req.body.status,
      start_date: req.body.start_date,
      finish_date: req.body.finish_date,
      task_total_xp: req.body.task_total_xp,
      user_id: req.decoded.user.id,
      org_id: req.params.org_id,
      goal_id: req.params.goal_id,
    }, '*')
    .then((postBody)=>{
      res.json({ task: postBody })
    })
  },
  removeOne: (req, res) => {
    knex('task')
    .where('id', req.params.task_id)
    .del()
    .then(()=>{
      res.json({ message: 'Task has been successfully deleted!' })
    }).catch((err)=>{
      res.json({ message: 'Failed to delete selected task.' })
    })
  },
  editOneAsAdmin: (req, res) => {
    knex('task')
    .where('id', req.params.task_id)
    .update({
      task_name: req.body.task_name,
      status: req.body.status,
      start_date: req.body.start_date,
      finish_date: req.body.finish_date,
      task_current_xp: req.body.task_current_xp,
      task_total_xp: req.body.task_total_xp,
      completed_at: req.body.completed_at,
      top_priority: req.body.top_priority
    }, '*')
    .then((response)=>{
      if(response.length === 0){
        res.json({ message: 'This task does not exist.' })
      }
      res.json({ message: 'Task has been successfully updated!' })
    }).catch((err)=>{
      res.json({ message: 'Failed to update selected task.' })
    })
  },
  editOne: (req, res) => {
    knex('task')
    .where('id', req.params.task_id)
    .update({
      task_current_xp: req.body.task_current_xp,
      completed_at: req.body.completed_at,
      top_priority: req.body.top_priority
    }, '*')
    .then((response)=>{
      if(response.length === 0){
        res.json({ message: 'This task does not exist.' })
      }
      res.json({ message: 'Task has been successfully updated!' })
    }).catch((err)=>{
      res.json({ message: 'Failed to update selected task.' })
    })
  },
}