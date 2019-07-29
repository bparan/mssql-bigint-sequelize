const Sequelize = require('sequelize');
const {expect} = require('chai');

describe('Integer and BIGINT', () => {

    const MAX_INTEGER = 2147483647;

    const sequelize = new Sequelize('sequelize_test', 'user', 'user', {
        host: 'localhost',
        dialect: 'mssql'
    });

    const User = sequelize.define('user', {
        business_id: {type: Sequelize.BIGINT, allowNull: false}
    }, {
        freezeTableName: true,
        timestamps: false
    });

    before(async () => {
        await User.sync();
    });

    after(async () => {
        await User.destroy({
            where: {}
        });
        await sequelize.close();
    });

    it('Should insert user with Integer Max Value into BIGINT column', async () => {

        expect(Number.isInteger(MAX_INTEGER)).to.be.true;

        await User.create({
            business_id: MAX_INTEGER
        });

        const users = await User.findAll();

        expect(users).to.have.lengthOf(1);
    });

    it('Should insert user with Integer Max Value + 1 into BIGINT column', async () => {
        const bigintValue = MAX_INTEGER + 1;

        expect(Number.isInteger(bigintValue)).to.be.true;

        await User.create({
            business_id: bigintValue
        });

        const users = await User.findAll();

        expect(users).to.have.lengthOf(2);
    });

});