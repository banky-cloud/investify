import { useState } from "react";
import { Table, Form, Row, Col, Card, Button } from "react-bootstrap";
import { apiEntry } from "../../register/register";
import toast from "react-hot-toast";
import Loader from "../../../components/spinner";


export default function TransactionsTable({transactions}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const token = localStorage.getItem("investify_token");
  const [approving, setApproving]= useState(false)
  const [declining, setDeclining]= useState(false)
  const statusFilterMap={
    Pending:"pending",
    Success:"approved",
    Failed:"declined",
    Completed:"completed"
  }
  console.log({statusFilter})
  const  approveTransaction=(id)=>{
    const proceed= window.confirm("Do you want to approve this transaction? ");
    if(proceed){
      setApproving(true)
      fetch(`${apiEntry}/transactions/approve/${id}`,
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            token
          }
        }
      )
      .then(res=>res.json())
      .then(data=>{
        setApproving(false)
        if(data.success){
        toast.success(data.result)
        }else{
          toast.error(data.result)
        }
      })
      .catch(err=>{
        toast.error(err)
      })

    }
  }
  const declineTransaction=(id)=>{
    const proceed= window.confirm("Do you want to decline this transaction? ")
    if(proceed){
      setDeclining(true)
      fetch(`${apiEntry}/transactions/decline/${id}`, {
        method:"Post",
        headers:{
          "Content-Type":"application/json",
          token
        }
      })
      .then(res=>res.json())
      .then(data=>{
        setDeclining(false);
        if(data.success){
          toast.success(data.result)
        }
        else{
          toast.error(data.result)
        }
      })
      .catch(err=>{
        console.log(err.message)
        toast.error(err.message)
      })
    }

  }
  const sortedTransactions=Array.from(transactions).sort((b, a)=>new Date(a.createdAt)-new Date(b.createdAt))
  const typeFilterMap={
    Deposit:"deposit",
    Withdrawal:"withdrawal",
    Earning:"earning",
    referral:"referral_bonus"
  }
  const filtered = sortedTransactions.filter((tx) => {
    const fullName= `${tx.user.firstName} ${tx.user.lastName}`;
    console.log(tx.createdAt)
    return (
      fullName.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter.toLocaleLowerCase() ? tx.status === statusFilterMap[statusFilter] : true) &&
      (typeFilter.toLocaleLowerCase() ? tx.transaction_type === typeFilterMap[typeFilter] : true)
    );
  });
  console.log({typeFilter})

  return (
    <Card className="mb-4" style={{width:"90vw", overflowX:"scroll"}}>
      <Card.Body>
        <h5>Transactions</h5>

        <Row className="mb-3">
          {/* Search */}
          <Col md={4}>
            <Form.Control
              placeholder="Search transactions..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>

          {/* Status Filter */}
          <Col md={3}>
            <Form.Select onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="Success">Success</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Col>

          {/* Type Filter */}
          <Col md={3}>
            <Form.Select onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="">All Types</option>
              <option value="Deposit">Deposit</option>
              <option value="Withdrawal">Withdrawal</option>
              <option value="Earning">Earning</option>
              <option value="referral">Referral Bonus</option>

            </Form.Select>
          </Col>
        </Row>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>User</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Type</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((tx,index) => (
              <tr key={tx._id}>
                <td>{new Date(tx.createdAt).toDateString()}</td>
                <td>{tx.user.firstName}</td>
                <td>${tx.amount}</td>
                <td>{tx.status}</td>
                <td>{tx.transaction_type}</td>
                <td>

                  {tx.status!=="completed"&&<Button onClick={()=>{approveTransaction(tx._id)}} variant="info">{approving?<Loader/>:"✔"}</Button>}
                  {tx.status!=="completed"&&<Button onClick={()=>{declineTransaction(tx._id)}} className="mx-2" variant="info">{declining?<Loader/>:"❌"}</Button>}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}