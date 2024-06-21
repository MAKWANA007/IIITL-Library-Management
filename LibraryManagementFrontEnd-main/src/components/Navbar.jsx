import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { FaRegUser } from 'react-icons/fa'
import { MdLibraryBooks } from 'react-icons/md'
import { GiHamburgerMenu } from 'react-icons/gi'
import Cart from './Cart'

const Navbar = ({ cartItems, setCartItems }) => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)

    const cartRef = useRef()
    const mobileNavOverlay = useRef()
    const location = useLocation()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        document.addEventListener("mouseup", e => {
            if (cartRef.current) {
                if (cartRef.current.contains(e.target)) return
                setIsCartOpen(false)
            }
        })
    }, [cartRef])

    useEffect(() => {
        if (window.innerWidth <= 768) {
            setIsScrolled(true)
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth <= 768) return
            setIsScrolled(() => window.scrollY > 5)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => window.removeEventListener('scroll', handleScroll)
    })

 

    const logoutUser = () => {
        localStorage.clear()
        window.location.reload()
    }


    return (
        <>
            <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
                <div className="nav-logo">
                    
                    <Link to='/' className='logo'>
                        <img src='/images/logo.png' alt='' />
                    </Link>
                </div>
                    
               
                <div className='nav-buttons'>
                        {localStorage.getItem('userName') ? (
                            <div
                                className="logged-user"
                            >
                                <button
                                    type='button'
                                    onClick={() => logoutUser()}
                                >
                                    Log out
                                </button>
                            </div>
                        ) : (
                            <Link to={`/login?continue=${location.pathname === '/login' ? searchParams.get('continue') : location.pathname}`}>
                                <FaRegUser className='nav-icon' />
                            </Link>
                        )}
                        <div className='cart-ref-container' ref={cartRef}>
                            <button className='cart-button' onClick={() => setIsCartOpen(!isCartOpen)}>
                                <span
                                    className="cart-badge"
                                >
                                    {cartItems?.reduce((total, item) => total + 1, 0)}
                                </span>
                                <MdLibraryBooks className='nav-icon' />
                            </button>
                        {isCartOpen && <Cart isScrolled={isScrolled} cartItems={cartItems} />} 
                        </div>
                </div>

            </nav>
            
        </>
    )
}

export default Navbar
