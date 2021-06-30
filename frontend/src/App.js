import Header from './components/Header/Header'
import Menu from './containers/Menu/Menu'
import Footer from './components/Footer/Footer'
import { Container } from 'react-bootstrap'
import { Link, Route, withRouter, Switch } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Cart from './containers/Cart/Cart'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import AlertMsg from './components/Alert/Alert'
import axios from 'axios'

function App(props) {
  const [cart, setCart] = useState({
    cartPrice: 0,
    totalPrice: 0,
    cartItems: [],
    contactDetails: {
      name: '',
      phone: ''
    },
  })

  const [prevOrderDetails, setPrevOrderDetails] = useState({
    id: null,
    price: null
  })

  const [day, setDay] = useState(null)

  const [placeOrderBtn, setPlaceOrderBtn] = useState(false)

  useEffect(() => {
    axios.get('day')
        .then(response => {
            let day = response.data.day
            console.log(day)
            setDay(day)
        }).catch(error => {
          console.log(error)
          // toast.error('Could not connect to server. Please try again!')
        })
        // let scale = 'scale(1)';
        // document.body.style.webkitTransform =  scale;
  }, []);

  const [isNull, setIsNull] = useState(0) 
  const [index, setIndex] = useState(0)
  const [nullIndex, setNullIndex] = useState(0)
  const [bogoArray, setBogoArray] = useState([])
  const [kidArray, setKidArray] = useState([])

  const bogo = (addedItem) => {
    console.log(bogoArray.length)
    console.log(bogoArray)
    if (bogoArray.length === 0) {
      console.log('First Time')
      console.log('inside first time if')
      let tempArray = [addedItem, 'empty']
      let bogoArrayTemp = [...bogoArray] 
      bogoArrayTemp.push(tempArray)
      setIsNull(1)
      setBogoArray(bogoArrayTemp)
      return -1
    }
    else {
      console.log('inside else')
      if (isNull === 1) {
        console.log('inside if of else')
        let bogoArrayTemp = [...bogoArray]
        let tempArray = bogoArrayTemp[index]
        const nullIndex1 = tempArray.indexOf('empty')
        const itemIndex = (nullIndex1 === 1) ? 0 : 1
        if (bogoArrayTemp[index][itemIndex].totalPrice >= addedItem.totalPrice) {
          console.log('inside if of if of else')
          console.log('max item is: ', bogoArrayTemp[index][itemIndex])
          addedItem.bogo = true
          bogoArrayTemp[index][nullIndex1] = addedItem
          setBogoArray(bogoArrayTemp)
          setIsNull(0)
          setIndex(bogoArrayTemp.length-1)
          return addedItem.kid
        } else {
          console.log('inside else of if of else')
          bogoArrayTemp[index][itemIndex].bogo = true
          console.log('max item is: ', addedItem)
          bogoArrayTemp[index][nullIndex1] = addedItem
          setBogoArray(bogoArrayTemp)
          setIsNull(0)
          setIndex(bogoArrayTemp.length-1)
          return bogoArrayTemp[index][itemIndex].kid
        }
      } else if (isNull === 0) {
        console.log('inside else if of else')
        let tempArray = [addedItem, 'empty']
        let bogoArrayTemp = [...bogoArray]
        bogoArrayTemp.push(tempArray)
        setIsNull(1)
        setNullIndex(1)
        setIndex(bogoArrayTemp.length-1)
        setBogoArray(bogoArrayTemp)
        return -1
      }
    }
  }

  const bogoRemove = (removedItem) => {
    if (isNull === 0) {
      console.log('inside if')
      let bogoArrayTemp = [...bogoArray]
      for (let i=0; i<bogoArray.length; i++) {
        for (let j=0; j<2; j++) {
          if (bogoArrayTemp[i][j].kid === removedItem.kid) {
            let notNullItemIndex = (j===0) ? 1 : 0
            bogoArrayTemp[i][0].bogo = false
            bogoArrayTemp[i][1].bogo = false
            bogoArrayTemp[i][j] = 'empty'
            let id = bogoArrayTemp[i][notNullItemIndex].kid
            console.log('step 1')
            setIsNull(1)
            setIndex(i)
            setNullIndex(j)
            setBogoArray(bogoArrayTemp)
            console.log('step 2')
            return {kid: id, one: true}
          }
        }
      }
    } else if (isNull === 1) {
      console.log('inside else if 1')
      let bogoArrayTemp = [...bogoArray]
      for (let i=0; i<bogoArray.length; i++) {
        for (let j=0; j<2; j++) {
          if (bogoArrayTemp[i][j].kid === removedItem.kid) {
            let notNullItemIndex = (j === 1) ? 0 : 1
            if (index !== i) {
              bogoArrayTemp[i][0].bogo = false
              bogoArrayTemp[i][1].bogo = false
              bogoArrayTemp[index][nullIndex] = {...bogoArrayTemp[i][notNullItemIndex]}
              if (bogoArrayTemp[index][0].totalPrice >= bogoArrayTemp[index][1].totalPrice) {
                bogoArrayTemp[index][1].bogo = true
                let kidF = bogoArrayTemp[index][0].kid
                let id = bogoArrayTemp[index][1].kid
                bogoArrayTemp.splice(i, 1)
                setIsNull(0)
                setIndex(0)
                setNullIndex(0)
                setBogoArray(bogoArrayTemp)
                return {kid: id, one: false, kidF: kidF, onef: false}
              } else {
                let kidF = bogoArrayTemp[index][1].kid
                bogoArrayTemp[index][0].bogo = true
                let id = bogoArrayTemp[index][0].kid
                bogoArrayTemp.splice(i, 1)
                setIsNull(0)
                setIndex(0)
                setNullIndex(0)
                setBogoArray(bogoArrayTemp)
                return {kid: id, one: false, kidF: kidF, onef: false}
              }
            } else if (index === i) {
              bogoArrayTemp.splice(index, 1)
              setIsNull(0)
              setNullIndex(0)
              setIndex(0)
              setBogoArray(bogoArrayTemp)
              return {id: -1, one: false}
            }
          }
        }
      }
    }
  }

  function bogoCartPrice(cartTemp) {
    let cartPriceBogo = 0;
    cartTemp.cartItems.forEach(element => {
        if(element.bogo === false) {
            cartPriceBogo = cartPriceBogo + element.totalPrice
        }
      });
    return cartPriceBogo
  }

  const addToCart = (orderedObject) => {
    console.log('inside add to cart')
    let orderedObjectCopied = {...orderedObject}
    orderedObjectCopied['bogo'] = false
    let cartTemp = {...cart}
    let kidArrayTemp = [...kidArray]
    do{
      orderedObjectCopied['kid'] = cartTemp.cartItems.length + 1 + Math.floor(Math.random() * 1000);
    } while(kidArray.includes(orderedObjectCopied['kid']));
    kidArrayTemp.push(orderedObjectCopied['kid'])
    cartTemp['cartPrice'] = cartTemp['cartPrice'] + orderedObjectCopied.totalPrice
    cartTemp['totalPrice'] = cartTemp['totalPrice'] + orderedObjectCopied.totalPrice 
    cartTemp.cartItems.push(orderedObjectCopied)    
    console.log(orderedObjectCopied.size.name)
    if (day === 2 && (orderedObjectCopied.size.name !== 'regular' && orderedObjectCopied.category !== 'beverages')) {
      let kid = bogo({...orderedObjectCopied})
      let idIndex = null
      // bogoFunc(orderedObject)
      if (kid !== -1 ){
        if (kid === orderedObjectCopied.kid) {
          orderedObjectCopied['bogo'] = true
        } else if (cartTemp.cartItems.find((element, index) => {
          if (element.kid === kid) {idIndex = index; return true} else{return false} })) {
            cartTemp.cartItems[idIndex].bogo = true
        }
      }
      cartTemp['cartPrice'] = bogoCartPrice({...cartTemp})
      console.log(bogoCartPrice({...cartTemp}))
    }
    console.log('cart Length before:', cart.cartItems.length)
    // console.log(cart)
    toast.success('Added To Cart!');
    setKidArray(kidArrayTemp)
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

  // let orderId = 1;

  const postOrder = () => {
    const data = { ...cart }
    const clearCart = {
      cartPrice: 0,
      totalPrice: 0,
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
      setIndex(0)
      setIsNull(0)
      setBogoArray([])
      setNullIndex(0)
      setKidArray([])
      setValidated(false);
      setPlaceOrderBtn(false)
      props.history.replace('/order');
    }).catch(error => {
      console.log(error)
      setPlaceOrderBtn(false)
      toast.error('Could not connect to server. Please try again!')
    })
  }

  const placeOrder = (event) => {
    const form = event.currentTarget;
    setPlaceOrderBtn(true)
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      setPlaceOrderBtn(false)
    } else {
      event.preventDefault();
      event.stopPropagation();
      postOrder();
    }
  };

  const [itemRemoveTemp, setItemRemoveTemp] = useState(null)

  const clearCart = (event, item = null) => {
    const name = event.target.id
    let cartTemp = { ...cart }

    if (name === 'clear' || (name === 'remove' && cartTemp.cartItems.length === 1)) {
      cartTemp = {
        cartPrice: 0,
        totalPrice: 0,
        cartItems: [],
        contactDetails: {
          name: '',
          phone: ''
        }
      }
    // setGlobalVar(0)
    setIsNull(0)
    setNullIndex(0)
    setIndex(0)
    setBogoArray([])
    setKidArray([])
    } else if (name === 'remove') {
      const filtered = [...cartTemp.cartItems]
      cartTemp.cartItems = filtered.filter(el => {
        return el.kid !== item.kid
      })
      if (day === 2 && (item.size.name !== 'regular' && item.category !== 'beverages')){
        console.log('step 0')
        let retObj = bogoRemove({...item})
        console.log('step 3')
        if (retObj.kid !== -1) {
          cartTemp.cartItems.forEach((element, index1) => {
            if (element.kid === retObj.kid) {
              if (retObj.one === false) {
                cartTemp.cartItems[index1].bogo = true
              } else if (retObj.one === true) {
                cartTemp.cartItems[index1].bogo = false
              }
            }else if (retObj.kidF !== undefined && retObj.kidF === element.kid) {
              if (retObj.onef === false) {
                cartTemp.cartItems[index1].bogo = false
              }
            }})
        }
        setItemRemoveTemp(item)
      } else {
        cartTemp.cartPrice = cartTemp.cartPrice - item.totalPrice
      }
      cartTemp.totalPrice = cartTemp.totalPrice - item.totalPrice
    }
    setCart(cartTemp)
    console.log('cart', cart)
  }

  useEffect(() => {
    if(itemRemoveTemp !== null) {
      console.log('inside useeffect of itemremovetemp')
      console.log(cart)
      console.log(itemRemoveTemp)
      let cartCopy = {...cart}
      // if (itemRemoveTemp.bogo === false)
      let price = bogoCartPrice(cartCopy)
      cartCopy.cartPrice = price
      setCart(cartCopy)
    }
  }, [itemRemoveTemp])

  return (
    <div>
        <main className='app-body'>
          <Switch>
            <Route path={props.match.url} exact>
              <Menu addToCart={addToCart} />
              <Container>
              <Link to='/cart'>
                <div className='icon-wrapper'>
                  <i className='fas fa-shopping-cart fa-3x cart'></i>
                  <span className='badge'>{cart.cartItems.length !== 0 ? cart.cartItems.length: null}</span>
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
                clearCart={clearCart} 
                placeOrderBtn={placeOrderBtn}/>
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
                  <h4>Order No: <span>{prevOrderDetails.id}</span></h4>
                  <h4>Amount: <span className='rupee'>₹ </span><span>{prevOrderDetails.price}</span></h4>
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
