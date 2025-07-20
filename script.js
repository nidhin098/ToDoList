function login(callback) {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  callback(user, pass);
}
function validateLogin(username, password) {
  if (username === 'admin' && password === '12345') {
    window.location.href = 'main.html';
  } else {
    alert('Invalid Credentials!');
  }
}
if (window.location.pathname.includes('main.html')) {
  const todoList = document.getElementById('todoList');
  let completedCount = 0;
   fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(data => {
      const limitedTodos = data.slice(0, 20);
      limitedTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
          <input type="checkbox" class="form-check-input me-2" ${todo.completed ? '' : ''} />
          ${todo.title}
        `;
        const checkbox = li.querySelector('input');
        checkbox.addEventListener('change', () => {
          if (checkbox.checked) completedCount++;
          else completedCount--;
          validateCompletedTasks(completedCount);
        });
        todoList.appendChild(li);
      });
    });
  function validateCompletedTasks(count) {
    return new Promise((resolve, reject) => {
      if (count === 5) resolve("Congrats. 5 Tasks have been Successfully Completed");
    }).then(alert);
  }
}