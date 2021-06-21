import React from 'react'

const Radio = (props) => {
    const bold = {
        fontWeight: 500
    }

    return (
        <div className='div-form'>
            <label htmlFor={props.item.name}>
                <span style={props.defaultChecked === props.item.name ? bold : null} onClick={(e => {props.onChange(e, props.item)})}>
                    {/* <span className='rupee' style={props.defaultChecked === props.item.name ? bold : { fontWeight: 300 }}>₹</span>
                    <span className='span-price' style={props.defaultChecked === props.item.name ? bold : { fontWeight: 300 }}>{props.item.price}</span>
                    <span>{'  -  '}</span> */}
                    <span style={{ textTransform: 'capitalize' }}>{props.item.name}</span>
                </span>
            </label>
            <span style={props.defaultChecked === props.item.name ? bold : null} onClick={(e => {props.onChange(e, props.item)})} style={{textAlign: 'right', float: 'right', cursor: 'pointer'}}>
                    <span className='rupee' style={props.defaultChecked === props.item.name ? bold : { fontWeight: 300 }}>₹</span>
                    <span className='span-price' style={props.defaultChecked === props.item.name ? bold : { fontWeight: 300 }}>{props.item.price}</span>
                    <input
                    type='radio'
                    name='size'
                    onChange={(e) => { props.onChange(e, props.item) }}
                    checked={props.defaultChecked === props.item.name}
                    value={props.item.name} style={{marginLeft: '8px'}}
                />
                </span>
            
        </div>
    )
}

export default Radio
