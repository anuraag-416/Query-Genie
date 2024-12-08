const _ = require('lodash');

const convertDBRespToObject = dbResp => _.map(dbResp, item => item.get({ plain: true }));

module.exports = {
    convertDBRespToObject
}