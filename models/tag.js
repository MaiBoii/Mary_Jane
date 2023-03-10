const Sequelize = require('sequelize');

module.exports = class Tag extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique:true,
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Tag',
            tableName: 'tags',
            paranoid: false,
            charset:'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Tag.belongsToMany(db.Post, { through: 'PostTag' });
    }
};