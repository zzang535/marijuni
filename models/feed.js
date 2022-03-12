const Sequelize = require('sequelize')

class Feed extends Sequelize.Model {

    //* 테이블 설정
    static init(sequelize) {
        
        return super.init({
            comment: {
                type: Sequelize.STRING(200), // varchar in mysql
                allowNull: false, // required
            },
            date: {
                type: Sequelize.STRING(200), // varchar in mysql
                allowNull: false, // required
            },
            image_url: {
                type: Sequelize.STRING(200), // varchar in mysql
                allowNull: false, // required
            },
        }, {
            sequelize, // db와 모델 동기화
            modelName: 'Feed', // 모델 이름
            tableName: 'feed', // 테이블 이름
            underscored: true,
            charset : 'utf8',
            collate : 'utf8_general_ci',
        })
    }

    //* 관계 설정
    static associate(db) {

    }

}

module.exports = Feed