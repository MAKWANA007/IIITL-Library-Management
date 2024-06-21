import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import UpdateBookModal from './UpdateBookModal'
import { useEffect } from 'react'
import axios from 'axios'

const ManageBooksTable = ({ books, setBooks }) => {
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [activeBook, setActiveBook] = useState()

    useEffect(() => {
        if (isUpdateOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isUpdateOpen, books])

    const handleUpdate = (item) => {
        setIsUpdateOpen(true)
        setActiveBook(item)
    }
    
    const notifyToastBookDeleted = () => {
        toast.success('Book deleted', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }

    const deleteBook = async (id) => {
        try {
            const res = await axios.delete(`api/books/${id}`)
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = (id) => {
        deleteBook(id)
        notifyToastBookDeleted()
        setBooks(id, "delete", "")
    }

  return (
    <div className='table-container manage-books'>
        {isUpdateOpen && <UpdateBookModal setBooks={(id, action, updatedBook) => setBooks(id, action, updatedBook)} book={activeBook && activeBook} categories={[...new Set(books?.map(item => item.category))]} setIsUpdateOpen={val => setIsUpdateOpen(val)} />}
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
            {books?.length === 0 ? "No books" : (
                
                <table>
                    <tr>
                        <th>S. No</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                    {books?.map((item, index) => (

                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td>{item.category}</td>
                        <td className='desc'>{item.description.substring(0, 120) + (item.description.length > 120 ? "..." : "")}</td>
                        <td className='quantity'>{item.quantity}</td>
                        <td >
                            <div className="action-btns">
                            <button className='table-btn' onClick={() => handleUpdate(item)}><FaEdit className='icon' /></button>
                            <button className='table-btn' onClick={() => handleDelete(item._id)}><MdDelete className='icon' /></button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </table>
            )}
        </div>
  )
}

export default ManageBooksTable