const fs = require('fs');
const data = require('../data.json');
const {age, graduation, date, grade} = require('../utils.js');

exports.index = function(req, res) {
  const students = [];

  for(let student of data.students) {
    const professor = {
      ...student,
      school_year: grade(student.school_year)
    }

    students.push(professor);
  }

  return res.render('students/index', {students});
}

exports.create = function(req, res) {
  return res.render('students/create');
};

exports.post = function(req, res) {
  const keys = Object.keys(req.body);

  for(key of keys) {
    if(req.body[key] == '')
      return res.send('Please, fill all the fields!');
  }

  let { 
    name, 
    avatar_url, 
    email,
    birth, 
    school_year, 
    time
  } = req.body;

  const lastStudent = data.students[data.students.length - 1];
  let id = 1;

  birth = Date.parse(req.body.birth);

  if(lastStudent) {
    id = lastStudent.id + 1;
  }

  data.students.push({
    id,
    name, 
    avatar_url, 
    email,
    birth, 
    school_year, 
    time: Number(time)
  });

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if(err)
      return res.send('Write file error!');
    
    return res.redirect(`/students/${id}`);
  });
};

exports.show = function(req, res) {
  const { id } = req.params;

  const foundStudent = data.students.find(function(student) {
    return id == student.id;
  });

  if(!foundStudent) return res.send('It was not possible to find this student');

  const info = {
    ...foundStudent,
    birth: date(foundStudent.birth).birthday,
    school_year: grade(foundStudent.school_year)
  }

  return res.render('students/show', {student: info});
};

exports.edit = function(req, res) {
  const { id } = req.params;

  const foundStudent = data.students.find(function(student) {
    return id == student.id;
  });

  if(!foundStudent) return res.send('It was not possible to find this student');

  const student= {
    ...foundStudent,
    birth: date(foundStudent.birth).iso,
    time: Number(foundStudent.time)
  }

  return res.render('students/edit', { student });
};

exports.put = function(req, res) {
  const { id } = req.body;
  let index = 0;

  const foundStudent = data.students.find(function(student, foundIndex) {
    if(student.id == id) {
      index = foundIndex;
      return true;
    }
  });

  if(!foundStudent) return res.send('It was not possible to find this student');

  const student = {
    ...foundStudent,
    ...req.body,
    id: Number(id),
    birth: Date.parse(req.body.birth)
  }

  data.students[index] = student;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send('Not possible to update file!');

    return res.redirect(`students/${id}`);
  })
};

exports.delete = function(req, res) {
  const { id } = req.body;

  const foundStudent = data.students.filter(function(student) {
    return id != student.id
  });

  data.students = foundStudent;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send('Ops, it was not possible to complete this action!');

    return res.redirect('/students');
  })
};