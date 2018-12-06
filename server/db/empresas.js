const Joi = require('joi')
const db = require('./connection');

const schema = Joi.object().keys({
    nome: Joi.string().max(75).required().error(new Error('Nome da empresa pode conter até 75 caracteres')),
    localidades: Joi.array().items(
        Joi.string().max(100).error(new Error('Cada localidade da empresa pode conter até 100 caracteres'))
        ).error(new Error('A empresa precisa ter ao menos uma localidade')),
    areaDeAtuacao: Joi.string().max(75).required().error(new Error('Área de atuação pode conter até 75 caracteres')),
    descricao: Joi.string().max(500).required().error(new Error('A descrição da empresa pode conter menos de 500 caracteres')),
    site: Joi.string().regex(new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)),
    notasMedias: Joi.object().keys({
        ambiente: Joi.number().min(0).max(5).allow(''),
        aprendizado: Joi.number().min(0).max(5).allow(''),
        autonomia: Joi.number().min(0).max(5).allow('')
    }).error(new Error('Notas devem ser de 0 a 5 ou vazias'))
});

const empresas = db.get('empresas');

function getAll() {
    return empresas.find();
}

function create(emp) {
	//depois de fazer a lógica de criação de empresa, será necessário adicionar a lógica aqui para linkar com a experiência
	const resultado = Joi.validate(emp, schema);
	if (!resultado.error) {
		return empresas.insert(emp);
	} else {
		const erro = {
			erro: true,
			mensagem: resultado.error.message,
		}
		return Promise.reject(erro);
	}
}

function update(emp){
    //const resultado = Joi.validate(emp, schema);
    if(!resultado.error) {
        return empresas.updateOne({_id: emp.body["id"]});
    } else {
        const erro = {
            erro: true,
            mensagem: resultado.error.message,
        }
        return Promise.reject(erro);
     }
}

function remove(emp){
    return empresas.remove(emp);
}

module.exports = { getAll, create, update, remove };
