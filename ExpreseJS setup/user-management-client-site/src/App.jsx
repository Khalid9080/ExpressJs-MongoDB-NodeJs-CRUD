import { useState, useEffect } from 'react';
import './App.css';

function App() {
  
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user ={name,email}
    console.log(user);

  //   fetch('http://localhost:5000/users',{
  //     method:'POST',
  //     headers:{
        
  //   },
  //   body: JSON.stringify(user)
  // })
  //   .then(res=>res.json())
  //   .then(data=>{
  //     console.log('inside post response',data);
  //   })


  fetch('http://localhost:5000/users',{
    method:'POST',
    headers:{
      'content-type':'application/json'
  },
  body: JSON.stringify(user)
})
  .then(res=>res.json())
  .then(data=>{
    console.log('inside post response',data);
    const newUsers = [...users,data];
    setUsers(newUsers);
    form.reset();

  })

   };

  return (
    <>
      <h1>User Management System</h1>
      <h3>Numbers of users: {users.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="Name" />
        <br />
        <input type="email" name="email" placeholder="Email" />
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        {
          users.map(user => (
            <div key={user.id}>
              <p>{user.id}. {user.name} : {user.email}</p>
            </div>
          ))
        }
      </div>
    </>
  );
}

export default App;
