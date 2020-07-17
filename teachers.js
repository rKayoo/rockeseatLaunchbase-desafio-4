const fs = require('fs');
const data = require('./data.json');
const {age, graduation, date} = require('./utils.js');

// create 
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

//show 
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
}

//edit
exports.edit = function(req, res) {
  const { id } = req.params;

  const foundTeacher = data.teachers.find(function(teacher) {
    return id == teacher.id;
  });

  if(!foundTeacher) return res.send('It was not possible to find this teacher');

  const instructor = {
    ...foundTeacher,
    birth: date(foundTeacher.birth)
  }

  return res.render('teachers/edit', { instructor });
}