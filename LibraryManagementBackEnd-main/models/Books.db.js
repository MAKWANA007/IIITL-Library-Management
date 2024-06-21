const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    quantity: Number,
    image: String,
    description: String
})

bookSchema.pre("remove", async function (next) {
    try {   
        const IssueRequestModel = this.model("issuerequest")
        const requests = await IssueRequestModel.find({bookId: this._id})
        requests.forEach(request => {
            request.remove()
        })
        next()
    } catch (err) {
        console.log(_id)
    }
}) 

module.exports = mongoose.model("book", bookSchema)
