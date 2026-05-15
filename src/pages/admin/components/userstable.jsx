import { useState } from "react";
import { Table, Form, Row, Col, Card, Button } from "react-bootstrap";
import {apiEntry} from "../../register/register"
import Loader from "../../../components/spinner";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const dummyUsers = [
  { name: "Alice", email: "alice@mail.com", role: "Admin" },
  { name: "Bob", email: "bob@mail.com", role: "User" },
  { name: "John", email: "john@mail.com", role: "User" },
  { name: "Sarah", email: "sarah@mail.com", role: "Admin" },
];
const token=localStorage.getItem("investify_token")
const BalanceRow=({user})=>{
  const  [balance, setBalance]=useState(user.balance)
  const [updatingBalance, setUpdatingBalance]= useState(false)
  const navigate=useNavigate()
  const updateUser=()=>{
    console.log("hello")
    const proceed= window.confirm(`Do you want to set ${user.firstName}'s balance to $${balance}`);
    if(proceed){
      setUpdatingBalance(true)
    fetch(`${apiEntry}/users/edituser/${user._id}`,{
      method:"Post",
      headers:{
          "Content-Type":"application/json",
          token
      },
      body:JSON.stringify({balance})
    })
    .then(res=>res.json())
    .then(data=>{ 
      setUpdatingBalance(false)
      if(data.success){
        toast.success(data.result);
        navigate(0)
      }
      else{
        toast.success(data.result);
      }

    })
    .catch(err=>{
      console.log(err.message);
    })
    }
  }
  return(

    <td>${user.balance} <input placeholder="Edit balance" type="number"  onChange={(e)=>{setBalance(e.target.value)}}/> <Button disabled={updatingBalance} onClick={updateUser} variant="success">Update {updatingBalance&&<Loader/>}</Button></td>
  )
}
const UserActions= ({user})=>{
  const [promoting,setPromoting]=useState(false)
  const [demoting,setDemoting]=useState(false)
  const [deleting,setDeleting]=useState(false)
  const navigate= useNavigate()
  const promoteUser=()=>{
    const proceed= window.confirm(`Are you sure you   want to make ${user.firstName}  an Admin?`)
    if(proceed){
      setPromoting(true)
      fetch(`${apiEntry}/users/edituser/${user._id}`,{
        method:"Post",
        headers:{
          "Content-Type":"application/json",
          token
        },
        body:JSON.stringify({isAdmin:true})
      })
      .then(res=>res.json())
      .then(data=>{
        setPromoting(false);
        if(data.success){
          toast.success(data.result);
          navigate(0);
        }
        else{
          toast.error(data.result)
        }
      })
      .catch(err=>{
        setPromoting(false)
        console.log(err.message)
        toast.error(err.message)
      })
    }
  }

  const demoteUser=()=>{
    const proceed= window.confirm(`Are you sure you   want to demote ${user.firstName}   to  a regular user?`)
    if(proceed){
      setPromoting(true)
      fetch(`${apiEntry}/users/edituser/${user._id}`,{
        method:"Post",
        headers:{
          "Content-Type":"application/json",
          token
        },
        body:JSON.stringify({isAdmin:false})
      })
      .then(res=>res.json())
      .then(data=>{
        setPromoting(false);
        if(data.success){
          toast.success(data.result);
          navigate(0);
        }
        else{
          toast.error(data.result)
        }
      })
      .catch(err=>{
        setPromoting(false)
        console.log(err.message)
        toast.error(err.message)
      })
    }
  }
  return(
    <td style={{display:"flex", gap:"20px"}}>
      <Button disabled={promoting} onClick={promoteUser}>{promoting?<Loader/>:"➕"}</Button>
      <Button disabled={demoting} onClick={demoteUser}>{demoting?<Loader/>:"➖"}</Button>
      <Link to={`/notify/${user._id}`}>💌</Link>
    </td>
  )
}

export default function UsersTable({users}) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const filtered = users.filter((user) => {
    const fullName= `${user.firstName} ${user.lastName}`
    return (
      fullName.toLowerCase().includes(search.toLowerCase()) &&
      (roleFilter ?  (roleFilter==="Admin"?user.isAdmin===true:user.isAdmin===false) : true)
    );
  });

  return (
    

    <Card className="mb-4" style={{width:"90vw", overflowX:"scroll"}}>
      <Card.Body>
        <h5>Users</h5>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              placeholder="Search users..."
              onChange={(e) => setSearch(e.target.value)}
              />
          </Col>

          <Col md={3}>
            <Form.Select onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </Form.Select>
          </Col>
        </Row>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>phone</th>
              <th>Country</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((user, i) => {
              
              return <tr key={i}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin?"Admin":"Client"}</td>
                <td>(+{user.country.phone_code})  {user.phone}</td>
                <td>{user.country.name}</td>
                <BalanceRow user={user}/>
                <UserActions user={user}/>
                
              </tr>
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  
  );
}