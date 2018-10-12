const Joi = require('joi')
const db = require('./connection');

const schema = Joi.object().keys({
	//formato provisorio para testes
	cargo: Joi.string().alphanum().required(),
	tipo: Joi.string().valid('semestral', 'quadrimestral', 'ferias', 'trainee', 'outro').required(),
	salario: Joi.number().min(0),
	atividades_realizadas: Joi.string().max(500),
});

const experiencias = db.get('experiencias');

function getAll() {
    return experiencias.find();
}

function create(exp) {
	const resultado = Joi.validate(exp, schema);
	if (!resultado.error) {
		exp.data_criacao = new Date();
		return experiencias.insert(exp);
	} else {
		return Promise.reject(resultado.error);
	}
}

module.exports = { getAll, create };
