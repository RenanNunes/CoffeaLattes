const Joi = require('joi')
const db = require('./connection');

const schema = Joi.object().keys({
	email : Joi.string().required().email({ minDomainAtoms: 2 }).error(new Error('Email invalido.')),
	nome : Joi.string().min(3).max(75).required().error(new Error('O nome deve conter entre 3 e 75 caracteres.')),
	senha : Joi.string().required().min(3).max(30).error(new Error('A senha deve conter entre 3 e 30 caracteres.')),
	curso : Joi.string().required().min(3).max(50).error(new Error('O curso deve conter entre 3 e 50 caracteres.'))
});

const schemaUpdate = Joi.object().keys({
	email : Joi.string().email({ minDomainAtoms: 2 }).error(new Error('Email invalido.')),
	nome : Joi.string().min(3).max(75).error(new Error('O nome deve conter entre 3 e 75 caracteres.')),
	senha : Joi.string().min(3).max(30).error(new Error('A senha deve conter entre 3 e 30 caracteres.')),
	curso : Joi.string().min(3).max(50).error(new Error('O curso deve conter entre 3 e 50 caracteres.'))
});

const tipoUsuarioEnum = {
	comum: 0,
	admin: 1
}

const usuarios = db.get('usuarios');

function search(req) {
	if (req.query && req.query['id']) {
		return getOne(req.query['id']);
	} 
	else {
		return getAll();
	}
}

function getAll() {
	return usuarios.find();	
}

function getOne(id) {
	return usuarios.findOne({"_id": id});;	
}

function create(usuario) {
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

function update(usuario) {
	if (!req.query['id']){
		throw "Não pode deletar sem um id";
	}
	id = usuario["id"];
	delete usuario["id"];
	const resultado = Joi.validate(usuario, schemaUpdate);
	if (!resultado.error) {
		return usuarios.update({"_id": id}, { $set: usuario});
	} else {
		const erro = {
			erro: true,
			mensagem: resultado.error.message,
		}
		return Promise.reject(erro);
	}
}

function remove(req) {
	if (!req.query['id']){
		throw "Não pode deletar sem um id";
	}
	return usuarios.remove({"_id": req.query['id']});
}

async function login(req) {
	if (!req._body || !req.body["email"] || !req.body["senha"]){
		throw "Autenticação falhou.";
	}
	usuario = await usuarios.findOne({"email": req.body["email"]});
	if (usuario["senha"] === req.body["senha"]){
		await usuarios.update({"_id": usuario._id}, { $set: {"ultimoAcesso": new Date()}});
		return usuario; 
	}
	return false;
}

module.exports = { getAll, create, search, remove, update, login};