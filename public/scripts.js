const modalOverlay = document.querySelector('.modal-overlay');
const modal = document.querySelector('.modal');
const courses = document.querySelectorAll('.course');
const expand = document.querySelector('.expand');


for(const course of courses) {
  course.addEventListener('click', () => {
    const nameId = course.getAttribute('Id');
    window.location.href = `/courses/${nameId}`;
  });
}