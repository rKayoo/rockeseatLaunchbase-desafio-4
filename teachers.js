const fs = require('fs');
const data = require('./data.json');

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