const Router = require('express').Router
const db = require('../db/connection')
const { ObjectId } = require('mongodb')
const { ObjectID } = require('bson')

const router = Router()

// View de detalhes da nota
router.get('/:id', async function(req, res) {

    const id = new ObjectId(req.params.id)

    const note = await db.getDb().db().collection('notes').findOne({_id: id})

    res.render('notes/detail', {note})


})

// Form criação de rota
router.get('/', function(req, res) {
    res.render('notes/create')
})

// Envio da nota para inserção no banco
router.post('/', function(req, res) {
    const data = req.body
    const title = data.title
    const description = data.description

    db.getDb()
        .db()
        .collection('notes')
        .insertOne({ title: title, description: description })

    res.redirect(301, '/')

})

// View de edição de nota
router.get('/edit/:id', async function(req, res) {

    const id = new ObjectId(req.params.id)

    const note = await db.getDb().db().collection('notes').findOne({_id: id})

    res.render('notes/edit', {note})
})

// Edição de notas
router.post('/update', function(req, res) {

    const data = req.body
    const id = new ObjectID(data.id)
    const title = data.title
    const description = data.description

    db.getDb()
        .db()   
        .collection('notes')
        .updateOne({ _id: id}, {$set: {title: title, description: description}})

    res.redirect('/')
})

// Remoção da tarefa
router.post('/delete', function (req, res) {

    const data = req.body
    const id = new ObjectId(data.id)

    db.getDb()
        .db()
        .collection('notes')
        .deleteOne({_id: id})

    res.redirect(301, '/')
})

module.exports = router