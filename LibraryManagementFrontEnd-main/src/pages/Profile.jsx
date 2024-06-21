import React, { useState, useEffect } from 'react'
import { MdOutlineNotificationsActive } from 'react-icons/md'
import { GoIssueClosed, GoIssueOpened } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("userName")) {
            navigate("/")
        }
    }, [])

    useEffect(() => {
      if (localStorage.getItem('userName')) {
        if (localStorage.getItem('userName') === 'admin@iiitl.ac.in') {
          navigate("/admin")
        }
      }
    }, [])

    const [activeSidebar, setActiveSidebar] = useState(0);
    // 0-> active, 1-> issued
    const [requests, setRequests] = useState([]);
    const [issuedBooks, setIssuedBooks] = useState([])

    const SIDEBAR_CATEGORIES = [
        {
            "icon": <GoIssueOpened className='icon' />,
            "text": "Active Requests"
        },
        {
            "icon": <MdOutlineNotificationsActive className='icon' />,
            "text": "Issued Books"
        },
    ]

    
    const getIssueRequestsByUserId = async () => {
        try {
            const res = await axios.get(`/api/requestissue/${localStorage.getItem('userName')}`)
            setRequests(res.data)
            
        } catch (err) {
            console.log(err)
        }
    }

    const getIssuedBooks = async () => {
        try {
            const res = await axios.get(`/api/issue/${localStorage.getItem('userName')}`)
            setIssuedBooks(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const displayRequests = requests => {
        return (
            requests.map(item => (
                <div className="request">
                    <div className="img-container">
                        <img src={item.bookId.image} alt="" />
                    </div>
                    <div className="text-content">
                    <div className="text">
                        <h2>{item.bookId.title}</h2>
                        <p><span>Author: </span> {item.bookId.author}</p>
                        <p><span>Category: </span> {item.bookId.category}</p>
                    </div>
                    {activeSidebar === 1 && (

                        <div className="due-date">
                            <div className="">
                            <span>Due Date: </span>
                            {item.dueDate && item.dueDate.split("T")[0]}
                            </div>
                            <div className="">
                                <span>Fine: </span>
                                Rs. {item.fine && item.fine}
                            </div>
                        </div>
                    )}
                    </div>
                </div>
            ))
        )
    }

    useEffect(() => {
        getIssueRequestsByUserId()
        getIssuedBooks()
    }, [])

  return (
    <div className="profile">
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
            <div className="requests">
                    {activeSidebar === 0 ? ( requests.length === 0 ? "No active requests" : displayRequests(requests)) : activeSidebar === 1 ? ( issuedBooks.length === 0 ? "No issued books" : displayRequests(issuedBooks) ) : "" }

            </div>
    </div>
  )
}

export default Profile