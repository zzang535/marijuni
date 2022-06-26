const { History } = require('../../db/models') 

exports.list = async function list(req, res) {
    try {
        const history = await History.findAll({ order: [['date', 'DESC']] })
        console.log(history)

        res.status(200).send({ 
            success: true, 
            code: 1000, 
            message: '히스토리 가져오기 성공',
            data: history
        })
    } catch (err) {
        console.log(err)
    }
}

exports.upload = async function upload(req, res) {
    try {
        const history = await History.create(req.body)
        console.log(history)

        res.status(200).send({ 
            success: true, 
            code: 1000, 
            message: '히스토리 업로드 성공'
        })
    } catch (err) {
        console.log(err)
    }
}