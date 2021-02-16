import {useState} from 'react'

const Quantity = () => {
    return (
        <>
            <div class="input-group quantity">
                <div class="input-group-prepend">
                    <button>-</button>
                </div>
                <input type="text" class="form-control" value={0} disabled/>
                <div class="input-group-prepend">
                    <button>+</button>
                </div>
            </div>
        </>
    )
}

export default Quantity
