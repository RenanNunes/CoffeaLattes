const Joi = require('joi')
const db = require('./connection');

const schema = Joi.object().keys({
    empresa: Joi.string().max(75).required().error(new Error('Empresa pode conter até 75 caracteres')),
    cargo: Joi.string().max(75).required().error(new Error('Cargo pode conter até 75 caracteres')),
    descricao: Joi.string().required().error(new Error('Necessário inserir descrição')),
    dataLimite: Joi.date().required().error(new Error('Data máxima de inscrição necessária')),
    salario: Joi.number().min(0).precision(2).allow('').error(new Error('O salário deve ser um número maior ou igual a 0')),
    beneficios: Joi.object().keys({
		VRVA: Joi.number().min(0).precision(2).allow(''),
		VT: Joi.number().min(0).precision(2).allow(''),
    }).error(new Error('Os Beneficios devem ser valores monetarios válidos ou devem estar vazios')),
    tipo: Joi.string().valid('semestral', 'quadrimestral', 'ferias', 'trainee', 'outro').required().error(new Error('Ocorreu um erro no Tipo da experiência'))
});

const vagas = db.get('vagas');

const getAll = () => {
    return vagas.find();
};

const create = (vaga) => {
    const resultado = Joi.validate(vaga, schema);
    if (!resultado.error) {
        return vagas.insert(vaga);
    } else {
        const erro = {
			erro: true,
			mensagem: resultado.error.message,
		}
		return Promise.reject(erro);
    }
}

const remove = (vaga) => {
    return vagas.remove(vaga);
};

module.exports = { getAll, create, remove }