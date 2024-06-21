const IssueHistorySchema = require('../models/IssueHistory.db')

const getIssueHistory = async (req, res) => {
    try {
        const history = await IssueHistorySchema.find().populate("bookId")
        res.send(history)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getIssueHistory
}
