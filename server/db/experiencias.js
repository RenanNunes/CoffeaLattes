const Joi = require('joi')
const db = require('./connection');

const schema = Joi.object().keys({
	cargo: Joi.string().max(75).required().error(new Error('Cargo pode conter até 75 caracteres')),
	empresa: Joi.string().max(75).required().error(new Error('Empresa pode conter até 75 caracteres')),
	tipo: Joi.string().valid('semestral', 'quadrimestral', 'ferias', 'trainee', 'outros').required().error(new Error('Ocorreu um erro no Tipo da experiência')),
	atividadesRealizadas: Joi.string().max(500).required().error(new Error('As Atividades realizadas podem conter até 500 caracteres')),
	periodoContratado: Joi.string().required().error(new Error('Ocorreu um erro no Período contratado')),
	duracao: Joi.number().min(0).integer().allow('').error(new Error('A Duracao deve ser o número de meses arredondado')),
	dataEntrada: Joi.date().max('now').allow('').error(new Error('A Data de Entrada não pode ser um valor futuro')),
	salario: Joi.number().min(0).precision(2).allow('').error(new Error('O salário deve ser um número maior ou igual a 0')),
	beneficios: Joi.object().keys({
		VRVA: Joi.number().min(0).precision(2).allow(''),
		VT: Joi.number().min(0).precision(2).allow(''),
	}).error(new Error('Os Beneficios devem ser valores monetarios válidos ou devem estar vazios')),
});

const experiencias = db.get('experiencias');

function getAll() {
    var list = experiencias.find();
    var res = [];
    return list.each(function(exp) {
    	var obj = {};
    	//console.log(exp)
    	obj['cargo'] = exp['cargo'];
    	obj['empresa'] = exp['empresa'];
    	obj['tipo'] = exp['tipo'];
    	obj['salario'] = parseInt(exp['salario']);
    	//console.log(typeof parseInt(exp['salario']));
    	obj['periodoContratado'] = exp['periodoContratado'];
    	obj['idEmpresa'] = 0;
    	obj['idExp'] = exp['_id'];
    	res.push(obj);
    }).then(() => {
		//console.log(res);
    	return res;
    });
}

function create(exp) {
	//depois de fazer a lógica de criação de empresa, será necessário adicionar a lógica aqui para linkar com a experiência
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
