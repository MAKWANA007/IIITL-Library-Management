require('dotenv').config()
const express = require("express")
const db = require('./config/db')
const app = express()
const PORT = process.env.PORT || 9000
const cors = require("cors")
const cron = require('node-cron')
app.use(cors())
app.use(express.json())
const { getBooks, getBookById, addBook, updateBook, deleteBook, searchBooks } = require("./controllers/BookController")
const { getIssuedBooks, getIssuedBooksForFine, getIssuedBooksByUserId, getIssuedBooksByUserIdAndBookId, issueBook, returnBook, updateFine } = require("./controllers/IssueController")
const { requestIssue, getIssueRequests, getIssueRequestsByUserIdAndBookId, getIssueRequestsByUserId, handleRequest } = require("./controllers/IssueRequestController")
const { addUser, loginUser } = require("./controllers/UserController")
const { getIssueHistory } = require("./controllers/IssueHistoryController")

const {
    checkUserExists,
    checkPassword,
} = require('./middlewares/UserMiddleware')

// handle fine function

const handleFine = async () => {
    try {
        const issuedBooks = await getIssuedBooksForFine()
        const FINE = 20 // Fine in Rs.
        const DAYMARGIN = 7
        issuedBooks.forEach(issue => {
            const milliseconds =  Date.now() - issue.dueDate
            const millisIn7Days = DAYMARGIN * 24 * 3600 * 1000
            const extraFine = Math.floor(milliseconds / millisIn7Days) * FINE
            if (extraFine > 0) {
                updateFine(issue._id, extraFine)    
                console.log("Fine updated to: " + extraFine + " for: " + issue._id)          
            } 
        })
    } catch (err) {
        console.log(err)
    }
}

// UPDATE FINE ---------------------------

cron.schedule('0 0 0 * * *', () => {
    handleFine()
})

// ---------------------------------------



app.get("/api/books", getBooks)
app.get("/api/categories")
app.get("/api/book/:bookId", getBookById)
app.post("/api/books", addBook)
app.put("/api/books", updateBook)
app.delete("/api/books/:bookId", deleteBook)

app.get("/api/books/search", searchBooks)

app.get("/api/issue", getIssuedBooks)
app.get("/api/issue/:userId", getIssuedBooksByUserId)
app.get("/api/issue/:userId/:bookId", getIssuedBooksByUserIdAndBookId)
app.post("/api/issue", issueBook)
app.delete("/api/issue/:issueId", returnBook)

app.get("/api/issuehistory", getIssueHistory)

app.get("/api/requestissue", getIssueRequests)
app.get("/api/requestissue/:userId/:bookId", getIssueRequestsByUserIdAndBookId)
app.get("/api/requestissue/:userId", getIssueRequestsByUserId)
app.post("/api/requestissue", requestIssue)
app.delete("/api/requestissue/:requestId", handleRequest)

app.post("/api/users/add", checkUserExists, addUser)
app.post("/api/users/login", checkUserExists, checkPassword, loginUser)

app.listen(PORT, () => console.log("Server is running"))