import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ErrorModal({errors, setErrors}) {
  const [show, setShow] = useState(errors.length>0);
useEffect(()=>{
  setShow(errors.length>0)
},[errors])
  const handleClose = () => {
    setErrors([]);
    setShow(false)
    
    

  };
  

  return (
    <>
     

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className='bg-dark'
      >
        <Modal.Header closeButton>
          <Modal.Title>Fix the  following errors to continue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         {errors.map(error=><p>{error}</p>)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ErrorModal;