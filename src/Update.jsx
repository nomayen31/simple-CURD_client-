import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const loadedUser = useLoaderData()
    const {_id} = loadedUser;
    const handleUpdate = (e) =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        console.log(name, email);
        const updatedUser = {name , email}

        fetch(`http://localhost:5000/users/${_id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(updatedUser)
          })
        .then(res=> res.json())
        .then(data =>{
            console.log(data);
            if (data.modifiedCount > 0) {
                alert('user updated successfully')
                form.reset()
            }
        })
    }
    return (
        <div>
            <h3> update information of: { loadedUser.name}</h3>
            <form onSubmit={handleUpdate}>

                <input type="text" defaultValue={loadedUser?.name} name='name' id='' />
                <br />
                <input type="email" name="email" defaultValue={loadedUser?.email} id="" />
                <br />
                <button type='submit'>Update</button>
            </form>
        </div>
    );
};

export default Update;