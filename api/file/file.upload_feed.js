const { Feed } = require('../../models') // feed 로드

export async function upload_feed(req, res) {
    try {
        console.log('file call ok')
        console.log(req.body)
        console.log(req.file)
        const { comment, date } = req.body
        const { location } = req.file

        console.log(comment)
        console.log(date)
        console.log(location)

        const result = await Feed.create({ 
            comment: comment, 
            date: date,
            image_url: location
        })

        console.log(result)

        res.send('upload ok')
    } catch (err) {
        console.log(err)
    }
}