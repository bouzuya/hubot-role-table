// Description
//   A Hubot script to display roles in tabular form
//
// Configuration:
//   None
//
// Commands:
//   hubot role-table - display roles in tabular form
//
// Author:
//   bouzuya <m@bouzuya.net>
//
module.exports = function(robot) {
  var table;
  table = require('text-table');
  return robot.respond(/role-table$/i, function(res) {
    var roles, rows, u, users, _, _ref, _ref1;
    if (!(robot != null ? (_ref = robot.brain) != null ? (_ref1 = _ref.data) != null ? _ref1.users : void 0 : void 0 : void 0)) {
      return;
    }
    users = (function() {
      var _ref2, _results;
      _ref2 = robot.brain.data.users;
      _results = [];
      for (_ in _ref2) {
        u = _ref2[_];
        _results.push(u.name);
      }
      return _results;
    })();
    roles = ((function() {
      var _ref2, _results;
      _ref2 = robot.brain.data.users;
      _results = [];
      for (_ in _ref2) {
        u = _ref2[_];
        _results.push(u);
      }
      return _results;
    })()).reduce((function(roles, user) {
      (user.roles || []).forEach(function(role) {
        if (roles[role] == null) {
          roles[role] = [];
        }
        return roles[role].push(user.name);
      });
      return roles;
    }), {});
    rows = [[''].concat(users)].concat(Object.keys(roles).sort().map(function(role) {
      return [role].concat(users.map(function(user) {
        if (roles[role].indexOf(user) >= 0) {
          return 'O';
        } else {
          return '';
        }
      }));
    }));
    return res.send(table(rows, {
      align: ['l'].concat(users.map(function() {
        return 'c';
      }))
    }));
  });
};
