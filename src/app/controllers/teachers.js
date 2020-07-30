const {age, graduation, date} = require('../../lib/utils');

module.exports = {
  index: function(req, res) {
    return res.render('teachers/index');
  },
  create: function(req, res) {
    return res.render('teachers/create');
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
  },
  delete: function(req, res) {
    return;
  },
}