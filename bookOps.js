let bookArray = [
    {
        id: 123,
        title: "Moby-Dick; or, The Whale",
        author: "Herman Melville"
    },
    {
        id: 234,
        title: "Frankenstein; or, the Modern Prometheus",
        author: "Mary Shelley"
    },
    {
        id: 345,
        title: "Sense and Sensibility",
        author: "Jane Austen"
    }
]

const bearerKey = 'Bearer rosebud'

const getAllBooks = function() {
    return bookArray
}

const getBook = function(id) {
    const book = bookArray.find((book) => book.id == id)
    if (!book) {
        throw new Error('Book not found.')
    }
    return book
}

const addBook = function(book) {
    if (!book?.title || !book.author) {
            throw new Error("Missing or invalid JSON.")
    }
    try {
        const title = book.title
        const author = book.author
        let id = 0
        do
            id = Math.floor(Math.random() * 1000)
        while ((bookArray.findIndex((task) => task.id == id)) != -1)
        let newBook = {id,title,author}
        bookArray.push(newBook)
        return newBook
    } catch (e) {
        throw new Error("Failed to add book.")
    }
}

const updateBook = function(body, id) {
    if (!body) {
        throw new Error('Missing or invalid JSON.')
    }
    let index = bookArray.findIndex((book) => book.id == id)
    let oldBook = bookArray[index]
    let title = body.title == undefined ? oldBook.title : body.title
    let author = body.author == undefined ? oldBook.author : body.author
    
    let newBook = {id, title, author}
    bookArray.splice(index, 1, newBook)
    return newBook
}

const deleteBook = function(id) {
    const index = bookArray.findIndex((book) => book.id == id)
    if (index == -1) {
        throw new Error('No such book exists.')
    }
    bookArray.splice(index, 1)
}

const authenticate = function(auth) {
    if (auth != bearerKey) {
        throw new Error('Authentication failed.')
    }
}

module.exports = {
    getAllBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook,
    authenticate
}