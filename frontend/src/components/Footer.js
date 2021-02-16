import { Button } from "react-bootstrap";

const Footer = () => {

    const footerStyle = {
        textAlign: 'center',
        padding: "10px",
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        height: "60px",
        width: "100%",
        margin: "0 auto"
      };

    return (
        <div className='footer'>
            <div style={footerStyle}>
            <Button className='btn-view-cart' variant='success'>View Cart</Button>
            </div>
        </div>
    )
}

export default Footer
