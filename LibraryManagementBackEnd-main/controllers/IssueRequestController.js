const IssueRequestSchema = require('../models/IssueRequests.db')

const getIssueRequests = async (req, res) => {
    try {
        const requests = await IssueRequestSchema.find().populate("bookId")
        res.send(requests)
    } catch (err) {
        console.log(err)
    }
}

const getIssueRequestsByUserIdAndBookId = async (req, res) => {
    try {
        const requests = await IssueRequestSchema.find({studentId: req.params.userId, bookId: req.params.bookId})
        res.send(requests)
    } catch (err) {
        console.log(err)
    }
}

const getIssueRequestsByUserId = async (req, res) => {
    try {
        const requests = await IssueRequestSchema.find({studentId: req.params.userId}).populate("bookId")
        res.send(requests)
    } catch (err) {
        console.log(err)
    }
}

const requestIssue = async (req, res) => {
    try {
        const { bookId, studentId, requestDate, status } = req.body
        const request = await IssueRequestSchema.create({
            bookId,
            studentId,
            requestDate,
            status,
        })

        res.send('Issue requested' + request.id)
    } catch (err) {
        console.log(err)
    }
}

const handleRequest = async (req, res) => {
    try {
        const { requestId } = req.params
        const request = await IssueRequestSchema.findById(requestId)
        request.remove()

        res.send('request handled')
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getIssueRequests,
    getIssueRequestsByUserId,
    getIssueRequestsByUserIdAndBookId,
    requestIssue,
    handleRequest,
}
