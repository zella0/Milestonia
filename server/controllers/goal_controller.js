const knex = require("../db/knex.js");

module.exports = {
  addOne: (req, res) => {
    knex('goal')
      .insert({
        goal_name: req.body.goal_name,
        goal_total_xp: Number(req.body.goal_total_xp),
        start_date: req.body.start_date.toString(),
        finish_date: req.body.finish_date.toString(),
        org_id: req.params.org_id
      }, '*')
      .then((goalResponse) => {
        console.log(goalResponse);
        // get all the users within the current org that is not an admin
        // then add the goal to those users
        knex('user_has_org')
          .select('user_has_org.user_id')
          .where('user_has_org.org_id', req.params.org_id)
          .where('user_has_org.isAdmin', '=', false)
          .then((user_ids) => {
            if(!user_ids.length){
              res.json(goalResponse)
            }
            return user_ids.map((item) => {
              knex('user_goals_progress')
                .insert({
                  user_id: item.user_id,
                  goal_id: goalResponse[0].id
                })
                .then(() => {
                  res.json(goalResponse)
                }).catch(() => {
                  res.json({
                    message: 'There seems to be an error'
                  })
                })
            })
          }).catch(() => {
            res.json({
              message: 'There seems to be an error'
            })
          })
      }).catch(() => {
        res.json({
          message: 'There seems to be an error'
        })
      })
  },
  removeOne: (req, res) => {
    knex('goal')
      .where('id', req.params.goal_id)
      .del()
      .then(() => {
        res.json({
          message: 'Goal has been successfully deleted!'
        })
      }).catch((err) => {
        res.json({
          message: 'Failed to delete selected goal.'
        })
      })
  },
  editOneAsAdmin: (req, res) => {
    knex('goal')
      .where('id', req.params.goal_id)
      .update({
        goal_name: req.body.goal_name,
        goal_total_xp: req.body.goal_total_xp,
        start_date: req.body.start_date,
        finish_date: req.body.finish_date,
        top_priority: req.body.top_priority,
        status: req.body.status
      })
      .then(() => {
        res.json({
          message: 'Goal has been successfully updated!'
        })
      }).catch((err) => {
        res.json({
          message: 'Failed to update selected goal.'
        })
      })
  },
  editOneAsUser: (req, res) => {
    knex('user_goals_progress')
      .where('id', req.params.user_goal_id)
      .andWhere('user_id', req.decoded.user.id)
      .update({
        goal_current_xp: req.body.goal_current_xp,
        completed_at: req.body.completed_at
      })
      .then(() => {
        res.json({
          message: 'Goal has been successfully updated!'
        })
      }).catch((err) => {
        res.json({
          message: 'Failed to update selected goal.'
        })
      })
  },
}