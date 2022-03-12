/* 파일 라우터 루트  */
const multer = require('multer') // 파일 처리 모듈
const multerS3 = require('multer-s3') // multer - AWS S3 연결 모듈
const AWS = require('aws-sdk') // AWS 모듈

const express = require('express') 
const upload_feed = require('./file.upload_feed')
const list = require('./file.list')

const file_router = express.Router() 

// AWS id, access key 설정
AWS.config.update({
    accessKeyId: 'AKIAXDPSAAI3I325CJ5G',
    secretAccessKey: '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',
    region: 'ap-northeast-2'
})

// S3로 파일을 업로드 하기위한 설정
const upload = multer({
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: 'bird-s3',
        acl: 'public-read', // 파일 업로드시 권한 설정
        key(req, file, cb) {
            cb(null, `images/${Date.now()}_${file.originalname}`)
        }
    })
})

file_router.post(
    '/upload_feed', 
    upload.single('image_file'), 
    upload_feed.upload_feed
)

file_router.get(
    '/list', 
    list.list
)

module.exports = file_router