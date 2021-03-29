import React from 'react';
import MenuItem from './MenuItem';

const Category = (props) => {
    // display category title and its respective items 
    return (
        <div>
            <h3>{props.title}</h3>
            {
                props.items.map((item, i) => {
                    // display menu item under selected category
                    const key = props.title + ' ' + i;
                    return <MenuItem item={item} key={key} onAdd={props.onAdd} category={props.title}/>
                })
            }
        </div>
    )
}

export default Category;
