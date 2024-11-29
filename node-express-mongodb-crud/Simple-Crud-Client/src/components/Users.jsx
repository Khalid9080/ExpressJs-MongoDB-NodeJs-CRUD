import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
    const loadedUsers = useLoaderData();

    // State for delete data from UI
    const [users, setRemoveUser] = useState(loadedUsers);

    const handleDelete = (_id) => {
        console.log('Delete ID : ', _id);
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE',
            headers: {
                'content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.deletedCount > 0) {
                    alert('User deleted successfully');
                    // for delete data from UI
                    const remainingUsers = users.filter(user => user._id !== _id);
                    setRemoveUser(remainingUsers);
                }
            })
    };


    return (
        <div>
            {
                <div>
                    <h2>User Quantity: {users.length}</h2>

                    <div>
                        {
                            users.map(user => <p key={user._id}>{user.name} : {user.email} {user._id}

                                <Link to={`/update/${user._id}`}>
                                    <button>Update</button>
                                </Link>

                                {/* implementing delete  */}
                                <button onClick={() => handleDelete(user._id)}> X</button>
                            </p>)
                        }
                    </div>

                </div>
            }
        </div>
    );
};

export default Users;