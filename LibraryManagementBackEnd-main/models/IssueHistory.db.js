const mongoose = require('mongoose')
const issueHistorySchema = new mongoose.Schema({
    bookId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "book"
    },
    studentId: String,
    issueDate: Date,
    fine: Number,
})

module.exports = mongoose.model('issuehistory', issueHistorySchema)
