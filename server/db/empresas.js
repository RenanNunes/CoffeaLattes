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
 /*   notasMedias: Joi.object({

    })
 */
});

const empresas = db.get('empresas');

function getAll() {
    return empresas.find();
}

function create(novaEmpresa) {
	//depois de fazer a lógica de criação de empresa, será necessário adicionar a lógica aqui para linkar com a experiência
	const resultado = Joi.validate(novaEmpresa, schema);
	if (!resultado.error) {
		novaEmpresa.dataCriacao = new Date();
		return empresas.insert(novaEmpresa);
	} else {
		const erro = {
			erro: true,
			mensagem: resultado.error.message,
		}
		return Promise.reject(erro);
	}
}

function update(emp){
    console.log(emp);
    const resultado = Joi.validate(emp, schema);
    console.log("Sera q deu certo?");
    if(!resultado.error) {
        console.log("Vou editar");
        return empresas.update({_id: emp._id});
    } else {
        const erro = {
            erro: true,
            mensagem: resultado.error.message,
        }
        return Promise.reject(erro);
     }
}

function remove(emp){
    return empresas.delete({_id: emp._id});
}

module.exports = { getAll, create, update, remove };
