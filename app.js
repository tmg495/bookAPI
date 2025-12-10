const express = require('express')
const app = express()
const PORT = 3000
const bookOps = require('./bookOps.js')
const morgan = require('morgan')

app.use(morgan("dev"))
app.use(express.json())

app.get('/books', (req, res) => {
    const bookArray = bookOps.getAllBooks()
    res.json(bookArray)
})

app.get('/books/:id', (req, res) => {
    try {
        const book = bookOps.getBook(req.params.id)
        res.json(book)
    } catch (e) {
        res.status(404).send(e.message)
    }
})

app.post('/books', (req, res, next) => {
    try {
        bookOps.authenticate(req.headers.authorization)
        next()
    } catch (e) {
        res.status(401).send(e.message)
    }
})

app.post('/books', (req, res) => {
    try {
        const newBook = bookOps.addBook(req.body)
        res.json(newBook)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

app.put('/books/:id', (req, res, next) => {
    try {
        bookOps.authenticate(req.headers.authorization)
        next()
    } catch (e) {
        res.status(401).send(e.message)
    }
})

app.put('/books/:id', (req, res) => {
    try {
        const updatedBook = bookOps.updateBook(req.body, req.params.id)
        res.json(updatedBook)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

app.delete('/books/:id', (req, res, next) => {
    try {
        bookOps.authenticate(req.headers.authorization)
        next()
    } catch (e) {
        res.status(401).send(e.message)
    }
})

app.delete('/books/:id', (req, res) => {
    try {
        bookOps.deleteBook(req.params.id)
        res.send('Book deleted')
    } catch (e) {
        res.status(400).send(e.message)
    }
})

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send("Internal Service Error")
})

app.use((req, res, next) => {
    res.status(404).send("Page not found.")
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})