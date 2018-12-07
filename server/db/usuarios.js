const Joi = require('joi')
const db = require('./connection');

const schema = Joi.object().keys({
	email : Joi.string().required().email({ minDomainAtoms: 2 }).error(new Error('Email invalido.')),
	nome : Joi.string().min(3).max(75).required().error(new Error('O nome deve conter entre 3 e 75 caracteres.')),
	senha : Joi.string().required().min(3).max(30).error(new Error('A senha deve conter entre 3 e 30 caracteres.')),
	curso : Joi.string().required().min(3).max(50).error(new Error('O curso deve conter entre 3 e 50 caracteres.'))
});

const tipoUsuarioEnum = {
	comum: 0,
	admin: 1
}

const usuarios = db.get('usuarios');

function getAll() {
	return usuarios.find();	
}

function create(usuario) {
	console.log(usuario);
	const resultado = Joi.validate(usuario, schema);
	if (!resultado.error) {
		agora = new Date();
		usuario.dataCriacao = agora;
		usuario.ultimoAcesso = agora;
		usuario.tipoUsuario = tipoUsuarioEnum.comum;
		return usuarios.insert(usuario);
	} else {
		const erro = {
			erro: true,
			mensagem: resultado.error.message,
		}
		return Promise.reject(erro);
	}
} 

module.exports = { getAll, create};