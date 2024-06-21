import React, {useState} from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import SearchForm from './SearchForm'
import { ToastContainer, toast } from 'react-toastify'


const HeaderSlider = () => {

  const [clearFilters, setClearFilters] = useState(0)

    
    const notifyToastEmptySearch = () => {
        toast.error('Please enter some search text', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }

    return (
        <div className='header-img'>
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
                    className="toast-notification"
                />
            <div className="overlay"></div>
            <div className="content">
            <h1>IIITL COLLEGE LIBRARY</h1>
            <SearchForm notifyToastEmptySearch={() => notifyToastEmptySearch()} setClearFilters={val => setClearFilters(val)} />
            </div>
            <img src="/images/banner.jpg" alt="" />

        </div>
    )
}

export default HeaderSlider
