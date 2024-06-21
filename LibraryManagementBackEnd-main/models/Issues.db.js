const mongoose = require('mongoose')
const issueSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "book"
    },
    studentId: String,
    issueDate: {
        type: Date,
        default: () => Date.now(),
    },
    dueDate: Date,
    fine: {
        type: Number,
        default: 0,
    },
})

issueSchema.pre('save', async function (next) {
    this.dueDate = new Date(this.issueDate.getTime() + 7 * 24 * 60 * 60 * 1000)

    try {
        const BookModel = this.model('book')
        const book = await BookModel.findByIdAndUpdate(this.bookId, {
            $inc: { quantity: -1 },
        })
        next()
    } catch (err) {
        console.log(err)
    }
})

issueSchema.pre('remove', async function (next) {
    try {
        const BookModel = this.model('book')
        const book = await BookModel.findByIdAndUpdate(this.bookId, {
            $inc: { quantity: 1 },
        })

        const IssueHistoryModel = this.model('issuehistory')
        const history = await IssueHistoryModel.create({
            bookId: this.bookId,
            studentId: this.studentId,
            issueDate: this.issueDate,
            fine: this.fine
        })

        next()
    } catch (err) {
        console.log(err)
    }
})

module.exports = mongoose.model('issue', issueSchema)
