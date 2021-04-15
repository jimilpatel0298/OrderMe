import Header from './components/Header/Header'
import Menu from './containers/Menu/Menu'
import Footer from './components/Footer/Footer'
import { Container } from 'react-bootstrap'
import { Link, Route, withRouter, Switch } from 'react-router-dom'
import { useState } from 'react'
import Cart from './containers/Cart/Cart'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AlertMsg from './components/Alert/Alert'
import axios from 'axios'

function App(props) {
  const [cart, setCart] = useState({
    cartPrice: 0,
    cartItems: [],
    contactDetails: {
      name: '',
      phone: ''
    }
  })

  const addToCart = (orderedObject) => {
    const orderedObjectCopied = { ...orderedObject }
    let cartTemp = { ...cart }
    cartTemp['cartPrice'] = cartTemp['cartPrice'] + orderedObjectCopied.totalPrice
    cartTemp.cartItems.push(orderedObjectCopied)
    toast.success('Added To Cart!');
    setCart(cartTemp)
  }

  const nameHandler = (event) => {
    let cartTemp = { ...cart }
    cartTemp.contactDetails.name = event.target.value
    setCart(cartTemp)
  }

  const phoneHandler = (event) => {
    let cartTemp = { ...cart }
    cartTemp.contactDetails.phone = event.target.value
    setCart(cartTemp)
  }

  const [validated, setValidated] = useState(false);

  let orderId = null;

  const postOrder = () => {
    const data = { ...cart }
    console.log(data)
    const clearCart = {
      cartPrice: 0,
      cartItems: [],
      contactDetails: {
        name: '',
        phone: ''
      }
    }

    axios.post(`http://abad4ff5210e.ngrok.io/api/place_order`, data).then(response => {
      console.log(response.data.data.order_id)
      orderId = response.data.data.order_id
      console.log('inside then')
      setCart(clearCart);
      setValidated(false);
      props.history.replace('/order');
    }).catch(error => {
      console.log(error)
      console.log('inside catch')
      toast.error('Could not connect to server. Please try again later.')
    })
  }

  const placeOrder = (event) => {
    const form = event.currentTarget;
    console.log(form.checkValidity())
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      event.stopPropagation();
      postOrder();
    }
  };

  const clearCart = (event, item = null) => {
    const name = event.target.id
    let cartTemp = { ...cart }

    if (name === 'clear' || (name === 'remove' && cartTemp.cartItems.length === 1)) {
      cartTemp = {
        cartPrice: 0,
        cartItems: [],
        contactDetails: {
          name: '',
          phone: ''
        }
      }
    } else if (name === 'remove') {
      const filtered = [...cartTemp.cartItems]
      cartTemp.cartItems = filtered.filter(el => {
        return el.id !== item.id
      })
    }
    setCart(cartTemp)
  }

  return (
    <div>
      <Header />
      <Container>
        <ToastContainer
          position="top-center"
          transition={Bounce}
          autoClose={1500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        <main className='py-3'>
          <Switch>
            <Route path={props.match.url} exact>
              <Menu addToCart={addToCart} />
              <Link to='/cart'>
                <div className='view-cart'><i className='fas fa-shopping-cart fa-3x'></i></div>
              </Link>
            </Route>
            <Route path={props.match.url + 'cart'}>
              <Cart cart={cart}
                name={cart.contactDetails.name}
                phone={cart.contactDetails.phone}
                nameHandler={nameHandler}
                phoneHandler={phoneHandler}
                placeOrder={placeOrder}
                validated={validated}
                clearCart={clearCart} />
              <Link to='/'>
                <div className='view-cart'><i className='fas fa-bars fa-3x'></i></div>
              </Link>
            </Route>
            <Route path={props.match.url + 'order'}>
              <AlertMsg variant='success' title='Order Successful!'><p>Thank you for your order. We've received it at our end. Please <span>Pay Rs. {cart.cartPrice} </span>at the cash counter. Your <span>Order ID </span>is <span>{orderId}</span></p></AlertMsg>
            </Route>
            <Route render={() => <h1>404. Page Not Found!</h1>} />
          </Switch>
        </main>
      </Container>
      <Footer />
    </div>
  );
}

export default withRouter(App);
