const Joi = require('joi')
const db = require('./connection');

const schema = Joi.object().keys({
	//formato provisorio para testes
	cargo: Joi.string().max(75).required().error(new Error('Cargo pode conter até 75 caracteres')),
	tipo: Joi.string().valid('semestral', 'quadrimestral', 'ferias', 'trainee', 'outro').required().error(new Error('Ocorreu um erro no Tipo da experiência')),
	salario: Joi.number().min(0).allow('').error(new Error('O salário deve ser um número maior ou igual a 0')),
	atividadesRealizadas: Joi.string().max(500).allow('').error(new Error('As Atividades realizadas podem conter até 500 caracteres')),
});

const experiencias = db.get('experiencias');

function getAll() {
    return experiencias.find();
}

function create(exp) {
	const resultado = Joi.validate(exp, schema);
	if (!resultado.error) {
		exp.dataCriacao = new Date();
		return experiencias.insert(exp);
	} else {
		const erro = {
			erro: true,
			mensagem: resultado.error.message,
		}
		return Promise.reject(erro);
	}
}

module.exports = { getAll, create };
