const Joi = require('joi')
const db = require('./connection');
const ObjectID = require('mongodb').ObjectID;
const jws = require('jws');

const schema = Joi.object().keys({
	cargo: Joi.string().max(75).required().error(new Error('Cargo pode conter até 75 caracteres')),
	empresa: Joi.string().max(75).required().error(new Error('Empresa pode conter até 75 caracteres')),
	tipo: Joi.string().valid('semestral', 'quadrimestral', 'ferias', 'trainee', 'outro').required().error(new Error('Ocorreu um erro no Tipo da experiência')),
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

function search(req) {
	if (!req.query){
		return getAll();
	} else {
		if (req.query['id']) {
			return getOne(req.query['id'], req.query['rvw']);
		} else {
			return getFilter(req.query)
		}
	}
}

function getAll() {
    var list = experiencias.find();
    return prepareToFrontEndList(list);
}

function getFilter(params) {
	query = {};
	if (params['tipo']){
		query['tipo'] = params['tipo'];
	}
	if (params['cargo']){
		query['cargo'] = new RegExp(params['cargo'], 'i');
	}
	if (params['salario']){
		query['salario'] = {'$gte': params['salario']};
	}
	if (params['VRVA']){
		query['beneficios.VRVA'] = {"$exists" : true, "$ne" : ""};
	}
	if (params['VT']){
		query['beneficios.VT'] = {"$exists" : true, "$ne" : ""};
	}
	var list = experiencias.find(query);
    return prepareToFrontEndList(list);
}

function prepareToFrontEndList(list) {
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
    	return res;
    });
}

async function getOne(id, lookupReview) {
	if (lookupReview) {
		const exp = await experiencias.aggregate([
			{
				$match : {
					_id : new ObjectID(id)
				}
			},
			{
				$lookup: {
					from: 'reviews',
					localField: 'review',
					foreignField: '_id',
					as: 'review'
				}
			}]);
		return exp && exp[0];
	} else {
		return experiencias.findOne({_id: id});
	}
}

function create(exp, token) {
	//depois de fazer a lógica de criação de empresa, será necessário adicionar a lógica aqui para linkar com a experiência
	if (!token || !jws.verify(token, 'HS256', process.env.SECRET || 'secret')){
		const erro = {
			erro: true,
			mensagem: 'Falha na autenticação',
		}
		return Promise.reject(erro);
	}

	const usuario = JSON.parse(jws.decode(token).payload);

	const resultado = Joi.validate(exp, schema);
	if (!resultado.error) {
		exp.dataCriacao = new Date();
		exp.usuario = new ObjectID(usuario['_id']);
		return experiencias.insert(exp);
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
	return experiencias.remove({_id: req.query['id']});
}

async function addReview(expId, reviewId) {
	try {
		const exp = await experiencias.findOne({_id: expId});
		exp.review = new ObjectID(reviewId);
		delete exp["_id"];
		return experiencias.update({"_id": expId}, exp);
	} catch (error) {
		res.status(500);
		res.json(error);
	}
}

module.exports = { search, getAll, getOne, create, remove, addReview };
