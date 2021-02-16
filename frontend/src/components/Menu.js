import Item from './Item'
import { Container} from 'react-bootstrap'
import { useState } from 'react'

const Menu = () => {
    const [menu, setMenu] = useState([
        {
            id: 1,
            name: "Cheese Sandwich",
            price: 100,
        },
        {
            id: 2,
            name: "Butter Sandwich",
            price: 120
        },
        {
            id: 3,
            name: "Cheese Chutney",
            price: 40
        },
    ])

    const [addOrderItem, setAddOrderItem] = useState([]);

    const addOrderItems = (item) => {
        console.log('added_items', item)
    }

    return (
        <div className='menu'>
            {(!menu) ?
                <h5 style={{ textAlign: 'center' }}>No items to display.</h5>
                :
                menu.map((item) => (
                    <>
                        <Item key={item.id} item={item} onAddClick={addOrderItems}/>
                    </>
                ))}
        </div>
    )
}

export default Menu
