import React from 'react'

const Checkbox = (props) => {
    const bold = {
        fontWeight: 500
    }

    return (
        <div className='div-form'>
            <label htmlFor={props.item.name}>
                
                <span style={props.item.purchased ? bold : null} onClick={(event) => {props.onChange(event, props.item)}}>
                    <span style={{ textTransform: 'capitalize' }}>{props.item.name}</span>
                </span>
            </label>

                <span style={props.item.purchased ? bold : null} onClick={(event) => {props.onChange(event, props.item)}} style={{textAlign: 'right', float: 'right', cursor: 'pointer'}}>
                    <span className='rupee' style={props.item.purchased ? bold : {fontWeight: 300}}>₹</span>
                    <span className='span-price' style={props.item.purchased ? bold : {fontWeight: 300}}>{props.item.price}</span>
                    <input
                    type='checkbox'
                    id={props.item.id}
                    name={props.item.name}
                    onChecked={(event) => { props.onChange(event, props.item) }}
                    checked={props.item.purchased} style={{marginLeft: '8px'}}
                />
                </span>
        </div>

    )
}

export default Checkbox
