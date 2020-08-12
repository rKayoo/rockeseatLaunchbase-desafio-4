const Teacher = require('../models/Teacher');
const {age, graduation, date} = require('../../lib/utils');

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
      callback(teachers) {
        const pagination = {
          page,
          total: Math.ceil(teachers[0].total / limit)
        }

        res.render('teachers/index', { teachers, pagination, filter });
      }
    }

    Teacher.paginate(params);
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

    Teacher.create(req.body, function(teacher) {
      return res.redirect(`teachers/${teacher.id}`);
    })
  },
  show: function(req, res) {
    Teacher.find(req.params.id, function(teacher) {
      if(!teacher) res.send('Teacher not found!');

      teacher.age = age(teacher.birth_date);
      teacher.education_level = graduation(teacher.education_level);
      teacher.subjects_taught = teacher.subjects_taught.split(',');

      teacher.created_at = date(teacher.created_at).format;

      res.render('teachers/show', { teacher })
    })
  },
  edit: function(req, res) {
    Teacher.find(req.params.id, function(teacher) {
      if(!teacher) res.send('Teacher not found!');

      teacher.birth_date = date(teacher.birth_date).iso;

      res.render('teachers/edit', { teacher })
    })
  },
  put: function(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == '')
        return res.send('Please, fill all the fields!');
    }

    Teacher.update(req.body, function() {
      res.redirect(`/teachers/${req.body.id}`)
    })
  },
  delete: function(req, res) {
    Teacher.delete(req.body.id, function() {
      res.redirect('/teachers')
    })
  },
}