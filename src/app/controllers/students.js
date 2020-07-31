const Student = require('../models/Student');
const {grade, date} = require('../../lib/utils');

module.exports = {
  index: function(req, res) {
    Student.all(function(students) {
      res.render('students/index', { students })
    })
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

    Student.create(req.body, function(student) {
      return res.redirect(`students/${student.id}`);
    })
  },
  show: function(req, res) {
    Student.find(req.params.id, function(student) {
      if(!student) res.send('Student not found!');

      student.birth_date = date(student.birth_date).birthday;
      student.school_year = grade(student.school_year);

      res.render('students/show', { student })
    })
  },
  edit: function(req, res) {
    Student.find(req.params.id, function(student) {
      if(!student) res.send('Student not found!');

      student.birth_date = date(student.birth_date).iso;

      res.render('students/edit', { student })
    })
  },
  put: function(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == '')
        return res.send('Please, fill all the fields!');
    }

    Student.update(req.body, function() {
      res.redirect(`/students/${req.body.id}`)
    })
  },
  delete: function(req, res) {
    Student.delete(req.body.id, function() {
      res.redirect('/students')
    })
  },
}