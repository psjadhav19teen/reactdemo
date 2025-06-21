const SingleUser=({user,deletUser})=>{
    return(
        <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.address}</td>
        <td><button onClick={()=>deletUser(user.id)}>Delete</button></td>
        </tr>
    )
}

export default SingleUser;