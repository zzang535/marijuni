const { Feed } = require('../../models') // feed 로드

export async function list(req, res) {
    try {
        const feeds = await Feed.findAll({ 
            order: [['date', 'DESC']]
        })
        console.log(feeds.every(feed => feed instanceof Feed))

        res.status(200).send({ 
            success: true, 
            code: 1000, 
            message: '피드 가져오기 성공',
            feeds: feeds
        })
    } catch (err) {
        console.log(err)
    }
}