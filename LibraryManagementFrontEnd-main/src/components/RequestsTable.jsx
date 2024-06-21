import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'


const RequestsTable = () => {

    const [requests, setRequests] = useState([])

    const getIssueRequests = async () => {
        try {
            const res = await axios.get("/api/requestissue")
            setRequests(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getIssueRequests()
    }, [])


    const notifyToastBookIssued = () => {
        toast.success('Book issued', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }
    
    const issueBook = async (requestId) => {
        try {
            const res = axios.delete(`/api/requestissue/${requestId}`)
            notifyToastBookIssued()
            setRequests(prev => prev.filter(item => item._id != requestId))
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
            {requests.length === 0 ? "No active requests" : (
                
                <table>
                    <tr>
                        <th>S. No</th>
                        <th>Book Title</th>
                        <th>Author</th>
                        <th>Student Id</th>
                        <th>Request Date</th>
                        <th>Action</th>
                    </tr>
                    {requests.map((item, index) => (

                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.bookId.title}</td>
                        <td>{item.bookId.author}</td>
                        <td>{item.studentId}</td>
                        <td>{item.requestDate.split("T")[0]}</td>
                        <td>
                            <button className='table-btn' onClick={() => issueBook(item._id)}>Issue</button>
                        </td>
                    </tr>
                    ))}
                </table>
            )}
        </div>
    )
}

export default RequestsTable
