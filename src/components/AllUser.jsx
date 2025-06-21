import { useState } from "react";
import userData from './User';
import SingleUser from "./SingleUser";


const AllUser=()=>{

    const [user,setUsers]=useState([]);
    const [showUsers,setShowUsers]=useState(false);

    const addAllUsers=()=>{
        setUsers(userData);
        setShowUsers(true)
    }

    const deleteAllUsers=()=>{
        setUsers([]);
        setShowUsers(false);
    }

    const deleteUser=(id)=>{
        const updatedUsers=user.filter(u=>u.id!==id)
        setUsers(updatedUsers)
        if(updatedUsers.length===0)
        {
            setShowUsers(false)
        }
    }

    return(
        <div>
            <h1>USer Management</h1>
            {!showUsers && (<button onClick={addAllUsers}>Add All Users</button>)}
            {showUsers && (
                <>
                <button onClick={deleteAllUsers}>Delete All Users</button>  
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map(u=>(
                            <SingleUser key={u.id} user={u} deletUser={deleteUser}/>
                        ))}
                    </tbody>
                </table>
                </>
            )}
        </div>
    )

}

export default AllUser;