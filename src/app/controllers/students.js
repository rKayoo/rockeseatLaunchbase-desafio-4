const Student = require('../models/Student');
const {grade, date} = require('../../lib/utils');

module.exports = {
  index: function(req, res) {
    let { filter, limit, page } = req.query;

    page = page || 1;
    limit = limit || 2;
    
    let offset = limit * (page - 1);

    const params = {
      filter,
      limit,
      page,
      offset,
      callback(studentsTable) {
        const pagination = {
          page,
          total: Math.ceil(studentsTable[0].total / limit)
        }

        let students = []; 

        for(let student of studentsTable) {
          student.school_year = grade(student.school_year);

          students.push(student);
        }

        res.render('students/index', { students, pagination, filter });
      }
    }

    Student.paginate(params);
  },
  create: function(req, res) {
    Student.teacherSelectOption(function(teachers) {
      return res.render('students/create', { teachers });
    });
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

      Student.teacherSelectOption(function(teachers) {
        res.render('students/edit', { student, teachers })
      });
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