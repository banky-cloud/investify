import Table from 'react-bootstrap/Table';

function ReUsableTable({headings, data}) {
  return (
    <div style={{width:"100vw", marginBottom:"30px"}}>

    <Table responsive>
      <thead>
        <tr>
          <th>😊</th>
          {headings.map((heading, index) => (
            <th key={index}>{heading}</th>
          ))}
        </tr>
      </thead>
            <tbody>
              {data.length==0&&<tr><td style={{width:"500px"}} className='text-danger text-center mt-4'>No transactions to display</td></tr>}
              {
                data.map(transaction=>{
                  return(
                    <tr key={transaction._id}>
                      <td>↘↖</td>
                      <td>{new Date(transaction.createdAt).toDateString()}</td>
                      <td>{transaction.transaction_type}</td>
                      <td>Trading</td>
                      <td style={{opacity:0.5}} className={transaction.status=="pending"?"bg-warning":(transaction.status==="approved"?"outline-success":"bg-danger")}>{transaction.status}</td>
                    </tr>
                  )
                })
              }

          </tbody>
    </Table>
    </div>
  );
}

export default ReUsableTable;
