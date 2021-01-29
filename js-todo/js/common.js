$(document).ready(function() {
  const allTodoItems = $('.todo-status__cnt--all');
  const completedTodos = $('.todo-status__cnt--completed');
  const uncompletedTodos = $('.todo-status__cnt--uncompleted');

  const allFilter = $('.todo__filter-items--all');
  const completedFilter = $('.todo__filter-items--completed');
  const unCompletedFilter = $('.todo__filter-items--uncompleted');

  let categoryTodos = 'all';

  $('.todo-form').click(() => {
    $('.todo-form__input').focus();
  });

  $('.todo-form').submit((e) => {
    e.preventDefault();
    if (!$('.todo-form__input').val().length) return;

    addTodo($('.todo-form__input').val());
    $('.todo-form__input').val('');
    $('.todo-status__cnt--all').html(allTodos.length);
    renderTodos();
  });

  $('.todo-panel').on('change', '.todo-item__status', function() {
    const id = findTodoId($(this));
    const todo = allTodos.find((todo) => todo.id === Number(id));
    todo.status = !todo.status;
    renderTodos();
  });

  $('.todo-panel').on('click', '.todo-item__del-layout', function() {
    const id = findTodoId($(this));
    const filteredTodos = allTodos.filter((todo) => todo.id !== Number(id));
    allTodos = [ ...filteredTodos ];
    renderTodos();
  });

  $('.todo-pages').on('click', '.todo-pages__item', function() {
    renderTodos(Number($(this).text()));
  });

  $('.todo__filter-items--all').click(() => {
    categoryTodos = 'all';
    setActiveFilter();
    renderTodos();
  });
  $('.todo__filter-items--uncompleted').click(() => {
    categoryTodos = 'uncompleted';
    setActiveFilter();
    renderTodos();
  });
  $('.todo__filter-items--completed').click(function () {
    categoryTodos = 'completed';
    setActiveFilter();
    renderTodos();
  });

  $('.todo-status__btn--set-uncompleted').click(() => {
    allTodos.forEach((todo => todo.status = false));
    
    renderTodos();
  });
  $('.todo-status__btn--set-completed').click(() => {
    allTodos.forEach((todo => todo.status = true));
    renderTodos();
  });

  $('.todo-status__btn--del-completed').click(() => {
    const filteredTodos = allTodos.filter((todo) => !todo.status);
    allTodos = [ ...filteredTodos ];
    renderTodos();
  });

  const renderTodos = (page) => {
    allTodoItems.html(allTodos.length);
    completedTodos.html(allTodos.filter((todo) => todo.status).length);
    uncompletedTodos.html(allTodos.filter((todo) => !todo.status).length);
    console.log(page);
    const [listStr, pagesStr] = convertTodoAndPagesToStr(categoryTodos, page);

    $('.todo-panel').html(listStr);
    $('.todo-pages').html(pagesStr);
  }

  const findTodoId = (curEl) => curEl.closest('li').attr('id');
  const setActiveFilter = () => {
    switch(categoryTodos) {
      case 'uncompleted': 
        allFilter.removeClass('todo__filter---active');
        completedFilter.removeClass('todo__filter---active');
        unCompletedFilter.addClass('todo__filter---active');
        break;
      case 'completed':
        allFilter.removeClass('todo__filter---active');
        unCompletedFilter.removeClass('todo__filter---active');
        completedFilter.addClass('todo__filter---active');
        break;
      default:
        allFilter.addClass('todo__filter---active');
        completedFilter.removeClass('todo__filter---active');
        unCompletedFilter.removeClass('todo__filter---active');
    }
  }
});

