document.addEventListener('DOMContentLoaded', () => {
    const addUserForm = document.getElementById('addUserForm');
    const userList = document.getElementById('userList');
  
    addUserForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = event.target.name.value;
      const email = event.target.email.value;
      window.api.send('add-user', { name, email });
      event.target.reset();
    });
  
    window.api.receive('users', (users) => {
      userList.innerHTML = '';
      users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} - ${user.email}`;
        userList.appendChild(li);
      });
    });
  
    // Request the user list on load
    window.api.send('get-users');
  });
  