const db = require('../../config/db');
const {age, graduation, date} = require('../../lib/utils');

module.exports = {
  all(callback) {
    db.query(`
      SELECT * FROM students
      ORDER BY name ASC
    `, function(err, results) {
      if(err) throw `Database Error! ${err}`;

      callback(results.rows);
    })
  },
  create(data, callback) {
    const query = `
      INSERT INTO students (
        name,
        avatar_url,
        birth_date,
        email,
        school_year,
        time,
        teacher_id
      ) VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `

    const values = [ 
      data.name,
      data.avatar_url,
      date(data.birth_date).iso,
      data.email,
      data.school_year,
      data.time,
      data.teacher
    ]

    db.query(query, values, function(err, results) {
      if(err) throw `Database Error! ${err}`;

      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(`
      SELECT students.*, teachers.name AS teacher_name
      FROM students 
      LEFT JOIN teachers ON (students.teacher_id = teachers.id)
      WHERE students.id = $1
    `, [id], function(err, results) {
      if(err) throw `Database Error! ${err}`;

      callback(results.rows[0]);
     })
  },
  findBy(filter, callback) {
    db.query(`
      SELECT * FROM students 
      WHERE students.name ILIKE '%${filter}%'
      OR students.email ILIKE '%${filter}%'
      ORDER BY name DESC
    `, function(err, results) {
      if(err) throw `Database Error! ${err}`;

      callback(results.rows);
    })
  },
  update(data, callback) {
    const query = `
      UPDATE students SET
      name=($1),
      avatar_url=($2),
      birth_date=($3),
      email=($4),
      school_year=($5),
      time=($6),
      teacher_id=($7)
      WHERE id = $8
    `;

    const values = [ 
      data.name,
      data.avatar_url,
      date(data.birth_date).iso,
      data.email,
      data.school_year,
      data.time,
      data.teacher,
      data.id
    ]

    db.query(query, values, function(err, results) {
      if(err) throw `Database Error! ${err}`;

      callback();
    })
  },
  delete(id, callback) {
    db.query(`
      DELETE FROM students 
      WHERE id = $1
    `, [id], function(err, results) {
      if(err) throw `Database Error! ${err}`;

      callback();
    });
  },
  teacherSelectOption(callback) {
    db.query(`SELECT id, name FROM teachers`, function(err, results) {
      if(err) throw `Database Error! ${err}`;

      callback(results.rows);
     })
  },
  paginate(params) {
    const { filter, limit, offset, callback} = params;
    let query,
        filterQuery = ``,
        totalQuery = ` (
          SELECT count(*) FROM students
          ) AS total`;

    if(filter) {
      filterQuery = `
        WHERE students.name ILIKE '%${filter}%'
        OR students.email ILIKE '%${filter}%'
      `

      totalQuery = ` (
        SELECT count(*) FROM students
        ${filterQuery}
        ) AS total`;
    }

    query = `
      SELECT *, ${totalQuery} 
      FROM students 
      ${filterQuery}
      LIMIT ($1) OFFSET ($2)
    `

    db.query(query, [limit, offset] ,function(err, results) {
      if(err) throw `Database error ${err}`;

      callback(results.rows)
    })
  }
} 