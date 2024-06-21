import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'


const IssuedBooksTable = () => {

    const [books, setBooks] = useState([])

    const getIssuedBooks = async () => {
        try {
            const res = await axios.get("/api/issue")
            setBooks(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getIssuedBooks()
    }, [])


    const notifyToastBookReturned = () => {
        toast.success('Book returned', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }
    
    const returnBook = async (issueId) => {
        try {
            const res = axios.delete(`/api/issue/${issueId}`)
            notifyToastBookReturned()
            setBooks(prev => prev.filter(item => item._id !== issueId))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='table-container'>
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
            {books.length === 0 ? "No issued books" : (
                
                <table>
                    <tr>
                        <th>S. No</th>
                        <th>Book Title</th>
                        <th>Author</th>
                        <th>Student Id</th>
                        <th>Issue Date</th>
                        <th>Due Date</th>
                        <th>Fine</th>
                        <th>Action</th>
                    </tr>
                    {books.map((item, index) => (

                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.bookId.title}</td>
                        <td>{item.bookId.author}</td>
                        <td>{item.studentId}</td>
                        <td>{item.issueDate.split("T")[0]}</td>
                        <td>{item.dueDate.split("T")[0]}</td>
                        <td>Rs. {item.fine}</td>
                        <td>
                            <button className='table-btn' onClick={() => returnBook(item._id)}>Return</button>
                        </td>
                    </tr>
                    ))}
                </table>
            )}
        </div>
    )
}

export default IssuedBooksTable
