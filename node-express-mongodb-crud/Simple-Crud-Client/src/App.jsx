

import './App.css'

function App() {

  const handleAddUser = (e) => {
    e.preventDefault();
    const form=e.target;
    const name=form.name.value;
    const email=form.email.value;
    const user ={name,email};
    console.log(user);

    fetch('http://localhost:5000/users',{
      method:'POST',
      headers:{
        'content-Type':'application/json'
      },
      body:JSON.stringify(user)
    })
    
    .then(res=>res.json())
    .then(data=>{
      console.log(data);

      // for understanding the response from the server 
      if(data.insertedId){
        alert('User added successfully');
        form.reset();
      }
    })
  }
  return (
    <>
      
      <h1>Simple CRUD Operation</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="text" name="email" id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>
     
    </>
  )
}

export default App
