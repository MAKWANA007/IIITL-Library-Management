import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const ShoeDetails = ({ setCartItems }) => {

    const [bookRequestStatus, setBookRequestStatus] = useState(0)

    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('userName')) {
          if (localStorage.getItem('userName') === 'admin@iiitl.ac.in') {
            navigate("/admin")
          }
        }
      }, [])

    const [shoeData, setShoeData] = useState() 

    const { bookId } = useParams()

    const getIssueRequestsByUserIdAndBook = async () => {
        try {
            const res = await axios.get(`/api/requestissue/${localStorage.getItem('userName')}/${shoeData._id}`)
            if (res.data.length > 0) {
                    setBookRequestStatus(1)
                }
            
        } catch (err) {
            console.log(err)
        }
    }

    const getIssuedBookById = async () => {
        try {
            const res = await axios.get(`/api/issue/${localStorage.getItem('userName')}/${shoeData._id}`)
            if (res.data.length > 0) {
                setBookRequestStatus(2)
            }
        } catch (err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        if (shoeData) {
            getIssueRequestsByUserIdAndBook()
            getIssuedBookById()
        }
    }, [shoeData])

    const getDataById = async (id) => {
        try {
            const res = await axios.get(`/api/book/${id}`)
            const data = res.data
            setShoeData(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (bookId) {
            getDataById(bookId)
        }
    }, [bookId])

    const notifyToastSuccess = () => {
        toast.success('Book issue requested', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }
    
    const notifyToastAlreadyRequested = () => {
        toast.error('Already requested issue for this book', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }
    const notifyToastAlreadyIssued = () => {
        toast.error('You have issued this book already', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }
    const notifyToastFailure = () => {
        toast.error('Book not available at this moment', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }
    const notifyToastNotLoggedIn = () => {
        toast.error('Login to request book issue', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }

    const addCartItem = async (data) => {
        try {
            const res = await axios.post('/api/requestIssue', {
                bookId: data._id,
                studentId: localStorage.getItem("userName")
            })
            notifyToastSuccess()
            setBookRequestStatus(1)
            setCartItems({
                bookId: data, 
                studentId: localStorage.getItem("userName"), 
                requestDate: Date.now()
            })
            
        } catch (err) {
            console.log(err)
        }
    }

    const onSubmit = () => {
        if (!localStorage.getItem('userName')) notifyToastNotLoggedIn()
        else if (bookRequestStatus === 1) notifyToastAlreadyRequested()
        else if (bookRequestStatus === 2) notifyToastAlreadyIssued()
        else if (shoeData.quantity === 0) notifyToastFailure()
        else {
            addCartItem(shoeData)
        }
    }

    return (
        <main>
            <section className='product-overview'>                
                <div className='product-image'>
                    <div className="img-container">
                        <img src={shoeData?.image} alt="book" />
                    </div>
                </div>
                <div
                    className='product-text'
                >
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
                    <h1 className='product-title'>
                        {shoeData?.title.toUpperCase()}
                    </h1>
                    
                    <p className='product-status'>
                        AVAILABILITY:{' '}
                        <span className='available'> {shoeData?.quantity > 0 ? (<span className='available'>AVAILABLE</span>) : ((<span className='not-available'>NOT AVAILABLE</span>))}</span>
                    </p>
                    
                    <section className='product-details'>
                        <span>DESCRIPTION</span>
                        <p>
                            {shoeData?.description}
                        </p>
                    </section>
                    <button onClick={onSubmit} className='btn-submit'>
                        REQUEST ISSUE
                    </button>
                </div>
            </section>
        </main>
    )
}

export default ShoeDetails
