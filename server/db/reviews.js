const Joi = require('joi')
const db = require('./connection');

const schema = Joi.object().keys({
    empresa: Joi.string().max(75).required().error(new Error('Empresa pode conter até 75 caracteres')),
    opinioes: Joi.string().required().error(new Error('Opinião é necessária')),
    recomenda: Joi.boolean().required().error(new Error('Recomenda deve ser booleano')),
    notas: Joi.object().keys({
        ambiente: Joi.number().min(0).max(5).allow(''),
        aprendizado: Joi.number().min(0).max(5).allow(''),
        autonomia: Joi.number().min(0).max(5).allow('')
    }).error(new Error('Notas devem ser de 0 a 5 ou vazias'))
});

const review = db.get('reviews');

const getAll = () => {
    return review.find();
};

const create = (rvw) => {
    const resultado = Joi.validate(rvw, schema);
    if (!resultado.error) {
        return review.insert(rvw);
    } else {
        const erro = {
			erro: true,
			mensagem: resultado.error.message,
		}
		return Promise.reject(erro);
    }
}

const remove = (rvw) => {
    return review.remove(rvw);
};

module.exports = { getAll, create, remove }