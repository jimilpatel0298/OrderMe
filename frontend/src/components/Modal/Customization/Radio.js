import React from 'react'

const Radio = (props) => {
    const bold = {
        fontWeight: 500
    }

    return (
        <div className='div-form'>
            <label htmlFor={props.item.name}>
                <input
                    type='radio'
                    name='size'
                    onChange={(e) => { props.onChange(e, props.item) }}
                    checked={props.defaultChecked === props.item.name}
                    value={props.item.name}
                />
                <span className='ml-2' style={props.defaultChecked === props.item.name ? bold : null}>
                    <span className='rupee' style={props.defaultChecked === props.item.name ? bold : { fontWeight: 300 }}>₹</span>
                    <span className='span-price' style={props.defaultChecked === props.item.name ? bold : { fontWeight: 300 }}>{props.item.price}</span>
                    <span>{'  -  '}</span>
                    <span style={{ textTransform: 'capitalize' }}>{props.item.name}</span>
                </span>
            </label>
        </div>
    )
}

export default Radio
