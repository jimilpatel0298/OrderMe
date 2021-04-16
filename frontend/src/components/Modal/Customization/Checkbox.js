import React from 'react'

const Checkbox = (props) => {
    const bold = {
        fontWeight: 500
    }

    return (
        <div className='div-form'>
            <label htmlFor={props.item.name}>
                <input
                    type='checkbox'
                    id={props.item.id}
                    name={props.item.name}
                    onChange={(event) => { props.onChange(event, props.item) }}
                    checked={props.item.purchased}
                />
                <span className='ml-2' style={props.item.purchased ? bold : null}>
                    <span className='rupee' style={props.item.purchased ? bold : {fontWeight: 300}}>₹</span>
                    <span className='span-price' style={props.item.purchased ? bold : {fontWeight: 300}}>{props.item.price}</span>
                    <span>{'  -  '}</span>
                    <span style={{ textTransform: 'capitalize' }}>{props.item.name}</span>
                </span>
            </label>
        </div>

    )
}

export default Checkbox
