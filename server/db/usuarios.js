const Joi = require('joi')
const db = require('./connection');
const CryptoJS = require('crypto-js');

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

const usuarios = db.collection('usuarios');

function search(req) {
	if (req.query && req.query['id']) {
		return getOne(req.query['id']);
	} 
	else {
		return getAll();
	}
}

function getAll() {
	return usuarios.find({},
						{"senha": 0 });	
}

function getOne(id) {
	return usuarios.findOne({"_id": id},
            				{"senha": 0 });;	
}

async function create(usuario) {
	const resultado = Joi.validate(usuario, schema);
	if (!resultado.error) {
		agora = new Date();
		usuario.dataCriacao = agora;
		usuario.ultimoAcesso = agora;
		usuario.tipoUsuario = tipoUsuarioEnum.comum;
		usuario.senha = CryptoJS.SHA256(usuario.senha).toString();
		try {
			ret = await usuarios.insert(usuario);
			delete ret["senha"];
			return ret;
		} catch(err) {
			const erro = {
				erro: true,
				mensagem: "O e-mail inserido já está sendo utilizado =/",
			}
			return Promise.reject(erro);
		}
	} else {
		const erro = {
			erro: true,
			mensagem: resultado.error.message,
		}
		return Promise.reject(erro);
	}
} 

async function update(usuario) {
	if (!usuario['id']){
		throw "Não pode editar sem um id";
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
	req.body.senha = CryptoJS.SHA256(req.body.senha).toString();
	return await usuarios.findOneAndUpdate ({ "email": req.body["email"], "senha":req.body["senha"]}, 
											{ $set: {"ultimoAcesso": new Date()}},
											{ projection : {"senha": 0}});
}

module.exports = { getAll, create, search, remove, update, login};