import React from 'react'
import { Link } from 'react-router-dom'

const ShoeBox = ({ shoeItem }) => {

    return (
        <Link to={`/book/${shoeItem?._id}`}>
            <div className="shoe-box">
                <div className='img-container'>
                    <img src={shoeItem?.image} alt={shoeItem?.title} />
                </div>

                <div className='shoe-text'>
                    <p className='shoe-name'>
                        {shoeItem?.title}
                    </p>
                    <button className='btn-submit'>View More</button>
                </div>
            </div>
        </Link>
    )
}

export default ShoeBox
