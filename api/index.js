const express = require('express')
const app = express()

const db = require('../db/models') // 시퀄라이즈 로드

const { sequelize } = db

// db 연결 및 테이블 생성
sequelize.sync({ force: false }) 
    .then(() => { 
        console.log('데이터베이스 연결')
    }).catch((err) => { 
        console.error(err)
    })


// json 형식 파서
app.use(express.json({ limit: '50mb' })) 

// x-www-form-urlencoded 형식 파서
app.use(express.urlencoded({ limit: '50mb', parameterLimit: 100000, extended: true })) 


app.use('/file', require('./file/file')) 
app.use('/history', require('./history')) 
app.use('/', (req, res) => { res.status(200).send('test ok') })

module.exports = {
    path: '/api',
    handler: app
}
