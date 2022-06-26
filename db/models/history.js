const Sequelize = require('sequelize')

class History extends Sequelize.Model {

    //* 테이블 설정
    static init(sequelize) {
        
        return super.init({
            date: {
                type: Sequelize.DATE, 
                allowNull: false, 
            },
            content_korean: {
                type: Sequelize.TEXT, 
                allowNull: false,
            },
            content_japanese: {
                type: Sequelize.TEXT, 
                allowNull: false,
            },
        }, {
            sequelize, // db와 모델 동기화
            modelName: 'History', // 모델 이름
            tableName: 'history', // 테이블 이름
            underscored: true,
            charset : 'utf8',
            collate : 'utf8_general_ci',
        })
    }

    //* 관계 설정
    static associate(db) {

    }

}

module.exports = History