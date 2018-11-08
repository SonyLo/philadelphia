const express = require('express')
const app = express()
const config = require('./config')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Product = require('./models/Product')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const User = require('./models/User')
const md5 = require('js-md5');
const Order = require('./models/Order')
var cookieParser = require('cookie-parser')

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

nunjucks.configure('views', {
    autoescape: true,
    express: app
});
mongoose.connect(config.mongoURL, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB connect')
    })
    .catch(err => {
        console.log(err)
    })




app.get('/', (req, res) => {
    res.sendFile('index.html');
})

app.get('/lending', async (req, res) => {
    const product = await Product.find({})
    let userAgent = req.headers["user-agent"]
    let ipAdr = req.ip
    let idHash = md5(userAgent+ipAdr)
    let candidate = {}
    try {
        candidate = await Order.findOne({idUser:idHash})
        if(candidate){
            console.log('Я уже есть')
        }
        else{
            candidate = await new Order({
                idUser:idHash
            }).save()
            console.log('Меня еще нет')
        }
        
        
    }catch(e){
        console.log(e)
    }
    res.cookie('idUser', candidate.idUser)
    res.render('index.html', { product })
})
// app.get('/login', (req, res) => {
//     res.render('login.html')
// })
// app.post('/login', async (req, res) => {
//     const candidate = await User.findOne({ email: req.body.data.email })

//     if (candidate) {
//         // Проверка пароля, пользователь существует
//         const passwordResult = bcrypt.compareSync(req.body.data.password, candidate.password)
//         if (passwordResult) {
//             // Генерация токена, пароли совпали
//             const token = jwt.sign({
//                 email: candidate.email,
//                 userId: candidate._id
//             }, config.jwt, { expiresIn: 60 * 60 })

//             res.status(200).json({
//                 token: `Bearer ${token}`
//             })
//         } else {
//             // Пароли не совпали
//             res.status(401).json({
//                 message: 'Пароли не совпадают. Попробуйте снова.'
//             })
//         }
//     } else {
//         // Пользователя нет, ошибка
//         res.status(404).json({
//             message: 'Пользователь с таким email не найден.'
//         })
//     }
// })
// app.get('/reg', (req, res) => {
//     res.render('registr.html')
// })

// app.post('/reg', async (req, res) => {
//     const candidate = await User.findOne({ email: req.body.data.email })
//     if (candidate) {
//         // уже есть
//     }
//     else {
//         // еще нет
//         const salt = bcrypt.genSaltSync(10)
//         const password = req.body.data.password
//         const user = new User({
//             email: req.body.data.email,
//             password: bcrypt.hashSync(password, salt)
//         })

//         try {
//             await user.save()
//             res.status(201).json(user)
//         } catch (e) {
//             // Обработать ошибку
//             console.log(e)
//         }


//     }





// })

app.post('/lending', async (req, res) => {
    console.log(req.body)
    // let userAgent = req.headers["user-agent"]
    // let ipAdr = req.ip
    // let idHash = md5(userAgent+ipAdr)
    const idUserCoocies =  req.cookies['idUser']
    try{
    const candidate = await Order.findOne({idUser:idUserCoocies})
    
        if(candidate){
                await Order.findOneAndUpdate({idUser:candidate.idUser}, {$set:{list:req.body.order}})
        }
        else{
            const order = await new Order({
                list: req.body.order,
                idUser: idHash
            }).save()
        }
    }
    catch(e){
        console.log(e)
    }
   

    res.status(200).json()
})


app.get('/product', async (req, res) => {
    const product = await new Product({
        name: 'GREEN MACHINE',
        cost: 7.5,
        description: 'Four-grain rice, English cucumber and asparagus, topped with charred edamame Sauce: Almond pesto ',
        imageSrc: 'img/1534353420946-26501534353420946-2650.jpg'
    })
    try {
        product.save()
        console.log('Товар добавлен')
    }
    catch (e) {
        console.log(e)
    }

})

app.get('/order', async (req, res)=>{
   
    const idUserCoocies =  req.cookies['idUser']
    
    const orderM = await Order.findOne({idUser:idUserCoocies})
    
    let orderP = []
    let summ  = 0
    for(let i = 0; i<orderM.list.length; i++){
        tempProd = await Product.findById(orderM.list[i])
        orderP.push(tempProd) 
        summ = summ + +tempProd.cost
    }
    
    res.render('order.html', {orderP, summ} )
})

app.post('/order', async (req, res)=>{
    
   
    const idUserCoocies =  req.cookies['idUser']
    const client = await Order.findOneAndUpdate({idUser:idUserCoocies}, {$set:{userName:req.body.data.firstname, phone:req.body.data.phone}})
    
    
    res.status(200).json({ st:"Your order is accepted"})
   

})
Array.prototype.remove = function(value) {
    var idx = this.indexOf(value);
    if (idx != -1) {
        // Второй параметр - число элементов, которые необходимо удалить
        return this.splice(idx, 1);
    }
    return false;
}
app.delete('/order', async (req, res)=>{
    const idUserCoocies =  req.cookies['idUser']
    try{
        const candidate = await Order.findOne({idUser:idUserCoocies})
        if(candidate){      
        candidate.list.remove(req.body.idPro)
        await Order.findOneAndUpdate({idUser:idUserCoocies}, {$set:candidate})
        }

    }catch(e){
        console.log(e)
    }
    res.status(200).json({res:'Del finish'})
})

app.listen(config.port, () => console.log(`Listening port ${config.port}!`))

