module.exports = {
  age: function(timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if ( month < 0 ||
         month == 0 &&
         today.getDate() > birthDate.getDate()) {
      age = age - 1;
    } 
    return age;
  },
  graduation: function(option) {
    if (option == 1) {
      return 'Ensino Médio Completo'
    } else if (option == 2) {
      return 'Ensino Superior Completo'
    } else if (option == 3) {
      return 'Mestrado'
    } else {
      return 'Doutorado'
    }
  },
  date: function(timestamp) {
     const birthDate = new Date(timestamp);

     const year = birthDate.getUTCFullYear();
     const month = `0${birthDate.getUTCMonth() + 1}`.slice(-2);
     const day = `0${birthDate.getUTCDate()}`.slice(-2);

     return {
       day,
       month,
       year,
       iso: `${year}-${month}-${day}`,
       birthday: `${day}/${month}`,
       format: `${day}-${month}-${year}`
    };
  },
  grade: function(year) {
    if(year == 1) {
      return '5EF';
    } else if (year == 2) {
      return '6EF';
    } else if (year == 3) {
      return '7EF';
    } else if (year == 4) {
      return '8EF';
    } else if (year == 5) {
      return '9EF';
    } else if (year == 6) {
      return '1EM';
    } else if (year == 7) {
      return '2EM';
    } else {
      return '3EM';
    }
  }
}