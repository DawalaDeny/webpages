const nameError = require('../errors/nameError')
const Filter = require('bad-words');
aa = new Filter();

const filter = async (req, res, next) => {
    const name = req.body.name;
    const filterdName = aa.clean(name)
    if (filterdName.includes('*')) {
        throw new nameError('inapp')
    }
    next();
}

module.exports = filter;