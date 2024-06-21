const BookSchema = require('../models/Books.db')

const getBooks = async (req, res) => {
    try {
        const books = await BookSchema.find()
        res.send(books)
    } catch (err) {
        console.log(err)
    }
}

const getBookById = async (req, res) => {
    try {
        const book = await BookSchema.findById(req.params.bookId)
        res.send(book);
    } catch (err) {
        console.log(err)
    }
}

const addBook = async (req, res) => {
    try {
        const { title, author, quantity, category, description, image } = req.body
        const book = await BookSchema.create({
            title: title,
            description: description,
            image: image,
            author: author,
            quantity: quantity,
            category: category,
        })
        res.send('Book added: ' + book.title)
    } catch (err) {
        console.log(err)
    }
}

const updateBook = async (req, res) => {
    try {
        const { bookId, category, title, author, quantity, description } = req.body
        const book = await BookSchema.findById(bookId)
        if (category) book.category = category
        if (title) book.title = title
        if (author) book.author = author
        if (quantity) book.quantity = quantity
        if (description) book.description = description
        await book.save()
        res.send(book)
    } catch (err) {
        console.log(err)
    }
}

const deleteBook = async (req, res) => {
    try {
        const { bookId } = req.params
        const book = await BookSchema.findById(bookId)
        book.remove()
        res.send('Book deleted')
    } catch (err) {
        console.log(err)
    }
}

const searchBooks = async (req, res) => {
    try {
        const key = Object.keys(req.query)[0]
            const books = await BookSchema.find({
                [key]: { $regex: req.query[key], $options: 'i' },
            })
        
        res.send(books)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
    searchBooks,
}
