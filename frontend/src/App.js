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
    },
  })

  const [globalVar, setGlobalVar] = useState(0)

  const [prevOrderDetails, setPrevOrderDetails] = useState({
    id: null,
    price: null
  })

  const bogoFunc = (orderedObject) => {
    console.log('global var:', globalVar)
    console.log('inside bogo funciton')
    const orderedObjectTemp = {...orderedObject}
    let cartItemsCopied = [...cart.cartItems]
    console.log('cart length:', cartItemsCopied.length)
    if (cartItemsCopied.length <= 1) {
      console.log('Cart Item is 1')
      // globalVar = globalVar + 0;
      return
    }
    else if (cartItemsCopied.length >= 2) {
      // for(let i=globalVar; i<=cartItemsCopied.length; i++) {
        if (cartItemsCopied.length %2 != 0) {
          console.log('odd item')
          return
        } else {
          let minItem = null;
          let index = null;
          if (cartItemsCopied[globalVar].totalPrice >= cartItemsCopied[globalVar+1].totalPrice) {
            minItem = cartItemsCopied[globalVar+1]
            index = globalVar+1
          } else {
            minItem = cartItemsCopied[globalVar]
            index = globalVar
          }
          cartItemsCopied[index].bogo = true
          console.log('MaxItem: ', minItem)
          // let maxItem = cartItemsCopied.reduce((max, item) => max.cartPrice > item.cartPrice ? max : item)
          setGlobalVar(globalVar+2)
        // }
      }
    }
  }

  const addToCart = (orderedObject) => {
    console.log('inside add to cart')
    let orderedObjectCopied = { ...orderedObject }
    orderedObjectCopied['bogo'] = false
    let cartTemp = { ...cart }
    cartTemp['cartPrice'] = cartTemp['cartPrice'] + orderedObjectCopied.totalPrice
    cartTemp.cartItems.push(orderedObjectCopied)
    toast.success('Added To Cart!');
    setCart(cartTemp)
    console.log('cart Length before:', cart.cartItems.length)
    bogoFunc(orderedObject)
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

  let orderId = 1;

  const postOrder = () => {
    const data = { ...cart }
    const clearCart = {
      cartPrice: 0,
      cartItems: [],
      contactDetails: {
        name: '',
        phone: ''
      }
    }
    let prevOrderDetailsTemp = {...prevOrderDetails}
    console.log('inside postorder')
    axios.post(`place_order`, data).then(response => {
      prevOrderDetailsTemp.id = response.data.order_id
      prevOrderDetailsTemp.price = response.data.price
      setPrevOrderDetails(prevOrderDetailsTemp);
      setCart(clearCart);
      setValidated(false);
      props.history.replace('/order');
    }).catch(error => {
      console.log(error)
      toast.error('Could not connect to server. Please try again!')
    })
  }

  const placeOrder = (event) => {
    const form = event.currentTarget;
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
      cartTemp.cartPrice = cartTemp.cartPrice - item.totalPrice
    }
    setCart(cartTemp)
  }

  return (
    <div>
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
          closeButton={false}
          pauseOnHover={false}
        />
        </Container>
        <main className='app-body'>
          <Switch>
            <Route path={props.match.url} exact>
              <Header title='menu'/>
              <Container as='div' style={{maxWidth: '540px'}}>
              <Menu addToCart={addToCart} />
              <Link to='/cart'>
                <div className='icon-wrapper'>
                  <i className='fas fa-shopping-cart fa-3x cart'></i>
                  <span className='badge'>{cart.cartItems.length != 0 ? cart.cartItems.length: null}</span>
                </div>
              </Link>
              </Container>
            </Route>
            <Route path={props.match.url + 'cart'}>
              <Header title='cart' />
              <Container as='div' style={{maxWidth: '540px'}}>
              <Cart cart={cart}
                name={cart.contactDetails.name}
                phone={cart.contactDetails.phone}
                nameHandler={nameHandler}
                phoneHandler={phoneHandler}
                placeOrder={placeOrder}
                validated={validated}
                clearCart={clearCart} />
              <Link to='/'>
                <div className='icon-wrapper'>
                  <i className='fas fa-bars fa-3x cart'></i>
                </div>
              </Link>
              </Container>
            </Route>
            <Route path={props.match.url + 'order'}>
              <Header />
              <Container>
              <AlertMsg variant='success' title='Order Successful!'>
                <div>
                <span style={{fontWeight: '300'}}>Thank you for your order. We've received it at our end. Please note the below details: </span>
                <div style={{margin: '15px 0'}}>
                  <h4>Order No: <span>4{prevOrderDetails.price}</span></h4>
                  <h4>Amount: <span className='rupee'>₹ </span><span>400{prevOrderDetails.price}</span></h4>
                </div>
                <span style={{fontWeight: '500'}}>Pay the above amount at the cash counter for your order to process.</span>
                <br/><span style={{display: 'block', marginTop: '10px', fontWeight: '300'}}>Enjoy your meal!</span>
                </div>
              </AlertMsg>
              </Container>
            </Route>
            <Route render={() => <div><Header /><Container><h2>404. Page Not Found!</h2></Container></div>} />
          </Switch>
        </main>
      <Footer />
    </div>
  );
}

export default withRouter(App);
