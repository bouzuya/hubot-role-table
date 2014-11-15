# Description
#   A Hubot script to display roles in tabular form
#
# Configuration:
#   None
#
# Commands:
#   hubot role-table - display roles in tabular form
#
# Author:
#   bouzuya <m@bouzuya.net>
#
module.exports = (robot) ->
  table = require 'text-table'

  robot.respond /role-table$/i, (res) ->
    return unless robot?.brain?.data?.users

    # ['name1', 'name2']
    users = robot.brain.data.users.map (u) -> u.name

    # {'role1': ['name1', 'name2']]
    roles = robot.brain.data.users.reduce(((roles, user) ->
      (user.roles || []).forEach (role) ->
        roles[role] = [] unless roles[role]?
        roles[role].push user.name
      roles
    ), {})

    # [['role1', 'O', '', 'O'], ...]
    rows = [
      [''].concat(users)
    ].concat(
      Object.keys(roles).map (role) ->
        [role].concat(
          users.map (user) ->
            if roles[role].indexOf(user) >= 0 then 'O' else ''
        )
    )
    res.send table(rows, { align: ['l'].concat(users.map -> 'c') })
