import React, {useRef} from 'react';
import MenuItem from './MenuItem';

const Category = (props) => {
    // display category title and its respective items 
    let str = props.title
    str = str.replace(/\s+/g, '-');
    return (
        <div id={str}>
            <h4 className='title-sticky'>{props.title}</h4>
            {
                props.items.map((item, i) => {
                    // display menu item under selected category
                    const key = props.title + '_' + item.id;
                    return <MenuItem item={item} key={key} onAdd={props.onAdd} category={props.title}/>
                })
            }
        </div>
    )
}

export default Category;
