const fs = require('fs');
const data = require('../data.json');
const {age, graduation, date} = require('../utils.js');

exports.index = function(req, res) {
  const teachers = [];

  for(let teacher of data.teachers) {
    const professor = {
      ...teacher,
      subjects: teacher.subjects.split(',')
    }

    teachers.push(professor);
  }

  return res.render('teachers/index', {teachers});
};

exports.create = function(req, res) {
  return res.render('teachers/create');
};

exports.post = function(req, res) {
  const keys = Object.keys(req.body);

  for(key of keys) {
    if(req.body[key] == '')
      return res.send('Please, fill all the fields!');
  }

  let { name, avatar_url, birth, educational_level, type, subjects} = req.body;

  birth = Date.parse(birth);
  const since = Date.now();
  const id = Number(data.teachers.length + 1);

  data.teachers.push({
    id,
    name,
    avatar_url,
    birth,
    educational_level,
    type,
    subjects,
    since
  });

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if(err)
      return res.send('Write file error!');
    
    return res.redirect('/teachers');
  });
};

exports.show = function(req, res) {
  const { id } = req.params;

  const foundTeacher = data.teachers.find(function(teacher) {
    return id == teacher.id;
  });

  if(!foundTeacher) return res.send('It was not possible to find this teacher');

  const info = {
    ...foundTeacher,
    age: age(foundTeacher.birth),
    educational_level: graduation(foundTeacher.educational_level),
    subjects: foundTeacher.subjects.split(','),
    since: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.since)
  }

  return res.render('teachers/show', {teachers: info});
};

exports.edit = function(req, res) {
  const { id } = req.params;

  const foundTeacher = data.teachers.find(function(teacher) {
    return id == teacher.id;
  });

  if(!foundTeacher) return res.send('It was not possible to find this teacher');

  const teacher= {
    ...foundTeacher,
    birth: date(foundTeacher.birth).iso
  }

  return res.render('teachers/edit', { teacher });
};

exports.put = function(req, res) {
  const { id } = req.body;
  let index = 0;

  const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
    if(teacher.id == id) {
      index = foundIndex;
      return true;
    }
  });

  if(!foundTeacher) return res.send('It was not possible to find this teacher');

  const teacher = {
    ...foundTeacher,
    ...req.body,
    id: Number(id),
    birth: Date.parse(req.body.birth)
  }

  data.teachers[index] = teacher;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send('Not possible to update file!');

    return res.redirect(`teachers/${id}`);
  })
};

exports.delete = function(req, res) {
  const { id } = req.body;

  const foundTeacher = data.teachers.filter(function(teacher) {
    return id != teacher.id
  });

  data.teachers = foundTeacher;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send('Ops, it was not possible to complete this action!');

    return res.redirect('/teachers');
  })
};