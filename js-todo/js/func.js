let allTodos = [];
let filteredTodos = [];
const maxPerPage = 5;

function addTodo(value) {
  allTodos = [
    ...allTodos,
    { 
      id: Date.now(),
      status: false,
      value
    }
  ];
}

function convertTodoAndPagesToStr(filter, page) {
  let activePage;
  switch(filter) {
    case 'uncompleted': filteredTodos = allTodos.filter((todo) => !todo.status); break;
    case 'completed': filteredTodos = allTodos.filter((todo) => todo.status); break;
    default: filteredTodos = [ ...allTodos ];
  }
  // if current page is not taken, set last page as active.
  if (page) {
    activePage = page;
  } else {
    activePage = getCountPages();
  }

  const paginatedTodos = paginate(filteredTodos, maxPerPage, activePage);
 
  const reducer = (accumulator, currentValue) => accumulator += `<li class="todo-item" id='${currentValue.id}'>
    <input class='todo-item__status' type='checkbox' ${currentValue.status ? 'checked' : ''} />
    <span class='todo-item__title'>${currentValue.value}</span>
    <span class='todo-item__del-layout'></span>
  </li>`;

  return [
    paginatedTodos.length ? '<ul class="todo-list">'+paginatedTodos.reduce(reducer, '')+'</ul>' : '',
    convertPagesToStr(getCountPages(), activePage)
  ]
}

function paginate(array, maxPerPage, page_number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * maxPerPage, page_number * maxPerPage);
}

function getCountPages() {
  let cntPages;
  if (!filteredTodos.length) {
    cntPages = 0;
  } else if (filteredTodos.length <= maxPerPage) {
    cntPages = 1;
  } else {
    cntPages = Math.ceil(filteredTodos.length / maxPerPage);
  }
  return cntPages;
}

function convertPagesToStr(pages, activePage) {
  let pagesStr = '';
  if (!pages) return '';

  for (let i = 1; i <= pages; i++) {
    pagesStr += `<span class='todo-pages__item ${activePage === i ? 'todo__filter---active' : ''}'>`+i+"</span>"; 
  }

  return pagesStr;
}