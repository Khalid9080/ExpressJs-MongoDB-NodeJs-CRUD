
import { useLoaderData } from "react-router-dom";
const Update = () => {
    const loadedUsers = useLoaderData();

    const handleUpdate = (e) => {

        // client side data capture
       e.preventDefault();
       const form=e.target;
       const name=form.name.value;
       const email=form.email.value;
       console.log(name,email);

       // send data clinet side to server side
       const updatedUser={name,email};
       fetch(`http://localhost:5000/users/${loadedUsers._id}`,{
        method:'PUT',
        headers:{
            'content-Type':'application/json'
        },
        body:JSON.stringify(updatedUser),
       }
        
       )
       .then(res=>res.json())
       .then(data=>{
           console.log(data);
           if(data.modifiedCount>0){
               alert('User updated successfully');
               form.reset();
           }
       })

    }
    return (
        <div>
            <h3>Update Information of {loadedUsers.name}</h3>

            <form onSubmit={handleUpdate}>
                <input type="text" name="name" defaultValue={loadedUsers?.name} id="" />
                <br />
                <input type="text" name="email" defaultValue={loadedUsers?.email} id="" />
                <br />
               <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default Update;