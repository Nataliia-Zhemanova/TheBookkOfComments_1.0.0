const mongoose = require('mongoose');

const generateId = () => new mongoose.Types.ObjectId();

module.exports = generateId;
