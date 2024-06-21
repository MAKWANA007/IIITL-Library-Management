const IssueSchema = require('../models/Issues.db')

const getIssuedBooks = async (req, res) => {
    try {
        const books = await IssueSchema.find().populate("bookId")
        res.send(books)
    } catch (err) {
        console.log(err)
    }
}

const getIssuedBooksForFine = async () => {
    try {
        const books = await IssueSchema.find().populate("bookId")
        return books
    } catch (err) {
        console.log(err)
    }
}

const updateFine = async (issueId, fine) => {
    try {
        const issue = await IssueSchema.findById(issueId)
        issue.fine = fine
        issue.save()
    } catch (err) {
        console.log(err)
    }
}

const getIssuedBooksByUserId = async (req, res) => {
    try {
        const books = await IssueSchema.find({ studentId: req.params.userId }).populate("bookId")
        res.send(books)
    } catch (err) {
        console.log(err)
    }
}
const getIssuedBooksByUserIdAndBookId = async (req, res) => {
    try {
        const books = await IssueSchema.find({ studentId: req.params.userId, bookId: req.params.bookId }).populate("bookId")
        res.send(books)
    } catch (err) {
        console.log(err)
    }
}

const issueBook = async (req, res) => {
    try {
        const { bookId, studentId } = req.body
        const book = await IssueSchema.create({
            bookId,
            studentId,
        })
        res.send('Book issued to: ' + book.studentId)
    } catch (err) {
        console.log(err)
    }
}

const returnBook = async (req, res) => {
    try {
        const { issueId } = req.params
        const issueDetails = await IssueSchema.findById(issueId)
        issueDetails.remove()
        res.send("Book returned")
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getIssuedBooks,
    getIssuedBooksForFine,
    getIssuedBooksByUserId,
    getIssuedBooksByUserIdAndBookId,
    issueBook,
    returnBook,
    updateFine
}
