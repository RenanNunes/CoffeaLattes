const Joi = require('joi')
const db = require('./connection');

const schema = Joi.object().keys({

});

const usuarios = db.get('usuarios');

function getAll() {
	return usuarios.find();	
}

module.exports = { getAll};