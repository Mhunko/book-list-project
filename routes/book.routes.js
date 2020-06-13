const {Router} = require('express')
const Book = require('../models/Book')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const router = Router()

router.post('/add', auth, async (req, res) => {
    try {

        const {title, author, description, linkTo, pages, deadline} = await req.body
        const book = new Book({
            title, author, description, linkTo, pages, deadline, owner: req.user.userId
        })

        await book.save()
        res.status(201).json(book)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})
router.get('/', auth, async (req, res) => {
    try {
        const books = await Book.find({owner: req.user.userId})
        res.json(books)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})
router.get('/:id', auth, async (req, res) => {
    try {
        //console.log('params', req.params)
        const book = await Book.findById(req.params.id)
        //console.log(book)
        res.status(201).json(book)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})


module.exports = router