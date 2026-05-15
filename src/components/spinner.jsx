import Spinner  from 'react-bootstrap/Spinner';

function Loader({style}) {
  return (
    <Spinner size="m"  style={style||{width:"1.5rem", height:"1.5rem"}} animation="border" role="status">
      {/* <span className="visually-hidden">Loading...</span> */}
    </Spinner>
  );
}

export default Loader;