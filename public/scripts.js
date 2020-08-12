const currentPage = location.pathname;
const menuItems = document.querySelectorAll('header .links a');

for(item of menuItems) {
  if(currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('active');
  }
}

function paginate(totalPages, selectedPage) {
  let oldPage,
      pages = [];

  for(let currentPage = 1; currentPage <= totalPages; currentPage++) {
    const firstAndLastPages = currentPage <= 2 || currentPage >= totalPages - 1;
    const pagesAfterSelected = currentPage <= selectedPage + 1;
    const pagesBeforeSelected = currentPage >= selectedPage - 1;

    if(
        firstAndLastPages ||
        pagesAfterSelected && 
        pagesBeforeSelected
    ) {
      if(oldPage && currentPage - oldPage > 2) {
        pages.push('...');
      }

      if(oldPage && currentPage - oldPage == 2) {
        pages.push(oldPage + 1);
      }

      pages.push(currentPage);
      oldPage = currentPage;
    }
  }

  return pages;
}

function createPaginate(pagination) {
  const filter = pagination.dataset.filter;
  const total = +pagination.dataset.total;
  const currentPage = +pagination.dataset.page;
  const pages = paginate(total, currentPage);

  let elements = '';

  for(let page of pages) {
    if(String(page).includes('...')) {
      elements += (`<span>${page}</span>`);
    } else {
      if(filter) {
        elements += (`<a href="/teachers?page=${page}&filter=${filter}">${page}</a>`);
      } else {
        elements += (`<a href="/teachers?page=${page}">${page}</a>`);
      }
    }

    pagination.innerHTML = elements
  }
}

const pagination = document.querySelector('.pagination');

if(pagination) {
  createPaginate(pagination);
}