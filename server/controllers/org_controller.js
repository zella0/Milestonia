const knex = require("../db/knex.js");

module.exports = {
  addOne: (req, res) => {
    knex('organization')
      .insert({
        org_name: req.body.org_name,
        icon_img: req.body.icon_img,
        org_total_pts: Number(req.body.org_total_pts)
      }, ['id', 'org_name', 'icon_img', 'org_total_pts'])
      .then((org) => {
        knex('user_has_org')
          .insert({
            user_id: req.decoded.user.id,
            org_id: org[0].id,
            isAdmin: true,
          }, )
          .then((response) => {
            res.json(org);
          }).catch(() => {
            res.json({
              message: 'Failed to create'
            })
          })
      }).catch(() => {
        res.json({
          message: 'Failed to create'
        })
      })
  },
  removeOne: (req, res) => {
    knex('organization')
      .where('id', req.params.org_id)
      .del()
      .then(() => {
        res.json({
          message: 'Organization has been successfully deleted!'
        })
      }).catch((err) => {
        res.json({
          message: 'Failed to delete selected organization.'
        })
      })
  },
  editOneAsAdmin: (req, res) => {
    knex('organization')
      .where('id', req.params.org_id)
      .update({
        org_name: req.body.org_name,
        icon_img: req.body.icon_img,
        org_total_pts: req.body.org_total_pts
      })
      .then(() => {
        res.json({
          message: 'Organization has been successfully updated!'
        })
      }).catch((err) => {
        res.json({
          message: 'Failed to update selected organization.'
        })
      })
  },
  editOneAsUser: (req, res) => {
    knex('organization')
      .where('id', req.params.org_id)
      .update({
        org_current_pts: req.body.org_current_pts
      })
      .then((response) => {
        res.json(response);
      }).catch((err) => {
        res.json({
          message: 'Failed to update selected organization.'
        })
      })
  },
  renderOne: (req, res) => {
    let promiseArr = [];

    let orgPromise = knex('organization')
      .where('id', req.params.org_id);
    promiseArr.push(orgPromise);

    let goalPromise = knex('goal')
      .where('goal.org_id', req.params.org_id)
      .join('user_goals_progress', 'user_goals_progress.goal_id', 'goal.id')
      .orderBy('start_date', 'asc')
    promiseArr.push(goalPromise);

    let rewardPromise = knex('reward')
      .where('reward.org_id', req.params.org_id)
      .orderBy('pts_required', 'asc');
    promiseArr.push(rewardPromise);

    let userPromise = knex('user')
      .join('user_has_org', 'user_has_org.user_id', 'user.id')
      .select('user_id', 'username', 'isAdmin', 'points')
      .where('user_has_org.org_id', req.params.org_id)
      .orderBy('points', 'desc')
    promiseArr.push(userPromise);

    Promise.all(promiseArr)
      .then((response) => {
        res.json({
          org: response[0],
          org_goal: response[1],
          org_reward: response[2],
          org_users: response[3],
        })
      })
  },
  renderAll: (req, res) => {
    knex('organization')
      .join('user_has_org', 'user_has_org.org_id', 'organization.id')
      .where('user_has_org.user_id', req.decoded.user.id)
      .select('organization.id', 'organization.org_name', 'organization.icon_img')
      .then((response) => {
        res.json(response)
      })
      .catch(() => {
        res.json({
          message: "invalid"
        })
      })
  }
}