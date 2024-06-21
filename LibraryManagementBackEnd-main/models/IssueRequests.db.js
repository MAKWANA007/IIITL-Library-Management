const mongoose = require('mongoose')
const issueRequestSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "book"
    },
    studentId: String,
    requestDate: {
        type: Date,
        default: () => Date.now(),
    }
})

issueRequestSchema.pre('remove', async function (next) {

    const IssueModel = this.model('issue')
    try {
        const issue = await IssueModel.create({
            bookId: this.bookId,
            studentId: this.studentId,
        })
    } catch (err) {
        console.log(err)
    }
    next()
})

module.exports = mongoose.model('issuerequest', issueRequestSchema)
