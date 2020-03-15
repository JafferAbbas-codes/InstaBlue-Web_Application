import React, { Component } from 'react'
import {list} from "./apiUser";
import {Link} from "react-router-dom";

export class Users extends Component {
    constructor(){
        super()
        this.state={
            users:[]
        }
    }

    componentDidMount () {
        list().then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                this.setState({users: data})
            }
        })
    }

    renderUsers = (users) => (
        <div className="row">
        {users.map((user,i) =>(
                   <div className="card col-md-4"  key={i}>
                   <img className="card-img-top" style={{objectFit:"cover",height: "13vw" , width:"100%"}}src="../user.jpg" alt="Profile picture"/>
                   <div className="card-body">
                     <h5 className="card-title">{user.name}</h5>
                     <p className="card-text">{user.email}</p>
                     <Link to={`/user/${user._id}`}> 
                     <button style={{backgroundColor:"#00a3f0", borderRadius:"8px" , color:"white", width:"120px", height:"38px"}}> 
                     View Profile </button> </Link>
                   </div>
                 </div>
        ))}
           </div>
    )

    render() {
        const {users} = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5"> Users </h2>

               {this.renderUsers(users)}
            </div>
        )
    }
}

export default Users;
