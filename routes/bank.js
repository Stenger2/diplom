const {Router} = require('express')
const { is } = require('express/lib/request')
const Card = require('../models/card')
const Lisings = require('../models/lising')
const Consult = require('../models/consult')
const Credits = require('../models/credit')
const Contributions = require('../models/contributions')
const ConsultPop = require('../models/consultPop')
const Admins = require('../models/admins')
const res = require('express/lib/response')
const { db } = require('../models/card')
const { append } = require('express/lib/response')
const router = Router()

router.get('/',(req, res) =>{
    res.render('authorisation',{
        title: 'авторизация',
    })
})


router.get('/admins__add', (req, res) =>{
    res.render('admins__add',{
        title: 'Добавление администратора',
        isadminsAdd:true,
    })
})



router.get('/cards', async (req, res) =>{
    const cards = await Card.find({}).lean()

    res.render('cards',{
        title: 'Карты',
        isCards: true,
        cards
    })
})

router.get('/lising',async (req, res) =>{
    const lising = await Lisings.find({}).lean()

    res.render('lising',{
        title: 'Лизинги',
        isLising:true,
        lisings: lising
    })
})

router.get('/credits',async (req, res) =>{
    const credit = await Credits.find({}).lean()

    res.render('credits',{
        title: 'Кредиты',
        isCredit: true,
        credits:credit
    })
})

router.get('/contributions',async (req, res) =>{
    const contribution = await Contributions.find({}).lean()

    res.render('contributions',{
        title: 'Вклады',
        isContributions: true,
        contributions:contribution
    })
})


router.get('/consult',async (req, res) =>{
    const consult = await Consult.find({}).lean()


    res.render('consult',{
        title: 'Консультации',
        isConsult:true,
        consults:consult
    })
})

router.get('/consultPop',async (req, res) =>{
    const consultPop = await ConsultPop.find({}).lean()


    res.render('consultPop',{
        title: 'Срочная консультация',
        isConsultPop:true,
        consultpops:consultPop
    })
})

router.post('/AddAdmin', async (req, res) =>{
    const RAdmin = new Admins({
        login: req.body.RegLogin, 
        password: req.body.RegPass
    })
    await RAdmin.save()

    res.redirect('/admins__add')
})

router.post('/delete', async (req, res)=>{
    await Card.deleteOne({_id:req.body.id})

    res.redirect('/cards')
})

router.post('/deleteCred', async (req, res)=>{
    await Credits.deleteOne({_id:req.body.id})

    res.redirect('/credits')
})

router.post('/deleteLising', async (req, res)=>{
    await Lisings.deleteOne({_id:req.body.id})

    res.redirect('/lising')
})

router.post('/deleteContr', async (req, res)=>{
    await Contributions.deleteOne({_id:req.body.id})

    res.redirect('/contributions')
})

router.post('/deleteConsult', async (req, res)=>{
    await Consult.deleteOne({_id:req.body.id})

    res.redirect('/consult')
})

router.post('/deletePop', async (req, res)=>{
    await ConsultPop.deleteOne({_id:req.body.id})

    res.redirect('/consultPop')
})





module.exports = router