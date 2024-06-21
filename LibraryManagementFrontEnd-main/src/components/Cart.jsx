import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
const Cart = ({ isScrolled, cartItems }) => { 

    const navigate = useNavigate()

    const notifyToastNotLoggedIn = () => {
        toast.error('Login to visit profile', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }

    const navigateToProfile = (e) => {
        e.preventDefault()
        if (!localStorage.getItem('userName')) notifyToastNotLoggedIn()
        else {
            navigate("/profile")
        }
    }


  return (
    <div className={`cart-container ${isScrolled && 'scrolled'}`}>
        <ToastContainer
                    position='top-right'
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                />
        <div className="cart-header">
            <p className="cart-header-quantity"> <span>{cartItems?.reduce((total, item) => total + 1, 0)}</span> active {cartItems?.reduce((total, item) => total + 1, 0) == 1 ? "request" : "requests"}</p>
        </div>

        {cartItems.length > 0 ? cartItems?.map((cartItem, index) => (
            <div className="cart-item" key={index}>
                <div className="cart-image img-container">
                    <img src={cartItem.bookId.image} alt="" />
                </div>
                <div className="cart-content">
                    <p className="cart-item-name"> <span>Title: </span> {cartItem.bookId.title}</p>
                    <p className="cart-item-cost"> <span>Author:</span> {cartItem.bookId.author}</p>
                    <p className="cart-item-quantity"><span>Category:</span> {cartItem.bookId.category}</p>
                </div>
            </div>
        )) :
        <p className="cart-empty">You have no active issue requests</p> 
        }

            
            <Link to="/profile" onClick={navigateToProfile} className="cart-modal-button btn-submit">Visit Profile</Link>
        
        
    </div>
  )
}

export default Cart