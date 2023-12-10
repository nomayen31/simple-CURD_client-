import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Users = () => {
    const LoadedUser = useLoaderData();
    const [users, setUsers]= useState(LoadedUser);
 
    const handleDelete = _id => {
        console.log('delete', _id);
        fetch(`http://localhost:5000/users/${_id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            if (data.deletedCount > 0) {
                alert('data deleted');
                const remaining = users.filter(user => user._id !== _id)
                setUsers(remaining);
            }
        })

    }




    return (
        <div>
            <h1>Users:{users.length}</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {
                    users.map(user => <div
                        style={{ border: '2px solid blue', padding: '5px', margin: '40px' }}
                        key={user._id}
                    >Name: {user.name}
                        <br /> Email: {user.email}
                        <br />
                        {user._id}
                        <Link to={`/update/${user._id}`}><button>Update</button></Link>
                        <button onClick={() => handleDelete(user._id)}>X</button>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Users;
