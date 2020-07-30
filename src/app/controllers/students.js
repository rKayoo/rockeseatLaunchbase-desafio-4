const {date, grade} = require('../../lib/utils');

module.exports = {
  index: function(req, res) {
    return res.render('students/index');
  },
  create: function(req, res) {
    return res.render('students/create');
  },
  post: function(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == '')
        return res.send('Please, fill all the fields!');
    }

    return;
  },
  show: function(req, res) {
    return;
  },
  edit: function(req, res) {
    return;
  },
  put: function(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == '')
        return res.send('Please, fill all the fields!');
    }

    return;
  },
  delete: function(req, res) {
    return;
  },
}
