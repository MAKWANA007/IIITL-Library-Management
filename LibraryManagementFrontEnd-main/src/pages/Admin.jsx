import React, { useState, useEffect } from 'react'
import { GoIssueOpened } from 'react-icons/go'
import { MdOutlineLibraryBooks } from 'react-icons/md'
import { BsPlusCircle } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import RequestsTable from '../components/RequestsTable'
import IssuedBooksTable from '../components/IssuedBooksTable'
import axios from 'axios'
import AddBookForm from '../components/AddBookForm'
import ManageBooksTable from '../components/ManageBooksTable'

const Admin = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("userName")) {
            navigate("/")
        } else if (localStorage.getItem("userName") !== 'admin@iiitl.ac.in') {
            navigate("/")
        }
    }, [])

    const [activeSidebar, setActiveSidebar] = useState(0);
    const [books, setBooks] = useState([])
    

    const getBooks = async () => {
        try {
            const res = await axios.get("/api/books")
            setBooks(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getBooks()
    }, [])

    const SIDEBAR_CATEGORIES = [
        {
            "icon": <GoIssueOpened className='icon' />,
            "text": "Issue Requests"
        },
        {
            "icon": <MdOutlineLibraryBooks className='icon' />,
            "text": "Issued Books"
        },
        {
            "icon": <BsPlusCircle className='icon' />,
            "text": "Add a book"
        },
        {
            "icon": <FiEdit className='icon' />,
            "text": "Manage Books"
        }
    ]

    const handleManageActions = (id, action, updatedBook) => {
        if (action === 'delete') {
            setBooks(prev => prev.filter(item => item._id != id))
        } else {
            setBooks(prev => prev.map(item => item._id === id ? updatedBook : item))
        }   
    }

  return (
    <div className='profile admin'>
        <aside className="profile-sidebar">
            <ul>
                { SIDEBAR_CATEGORIES.map((item, index) => (

                <li className={activeSidebar === index && 'active'} onClick={() => setActiveSidebar(index)}>
                    <h1>
                    {item.icon}
                    {item.text}
                    </h1>
                </li>
                )) }                
            </ul>
        </aside>
        {activeSidebar === 0 ? <RequestsTable /> : (activeSidebar === 1 ? <IssuedBooksTable /> : (activeSidebar === 2 ? <AddBookForm  setBooks={val => setBooks(prev => [...prev, val])} categories={[...new Set(books.map(item => item.category))]} /> : <ManageBooksTable books={books} setBooks={(id, action, updatedBook) => handleManageActions(id, action, updatedBook)} />))}
    </div>
  )
}

export default Admin