const Joi = require('joi')
const db = require('./connection');

const schema = Joi.object().keys({
	email : Joi.string().email({ minDomainAtoms: 2 }).require().error(new Error('Email invalido.')),
	nome : Joi.string().alphanum().min(3).max(30).required().error(new Error('O nome deve conter entre 3 e 30 caracteres alfanumericos.')),
	senha : Joi.string().required().min(3).max(30).error(new Error('A senha deve conter entre 3 e 30 caracteres.')),
	curso : Joi.string().required().min(3).max(30).alphanum().error(new Error('O curso deve conter entre 3 e 30 caracteres alfanumericos.'))
});

const tipoUsuarioEnum = {
	comum = 0,
	admin = 1
}

const usuarios = db.get('usuarios');

function getAll() {
	return usuarios.find();	
}

module.exports = { getAll};