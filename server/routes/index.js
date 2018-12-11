const experiencias = require('../db/experiencias.js');
const vagas = require('../db/vagas.js');
const reviews = require('../db/reviews.js');
const empresas = require('../db/empresas.js');

module.exports = function(app) {

	app.get('/', (req, res) => {
		res.json({
			message: 'HomePage'
		});
	});

	app.get('/experiencia', async (req, res) => {
		try {
			const exp = await experiencias.getAll();
			res.json(exp);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	})

	app.get('/experiencia/buscar', async (req, res) => {
		try{
			const exp = await experiencias.search(req);
			res.json(exp);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	})

	app.delete('/experiencia/apagar', async (req, res) => {
		try {
			const result = await experiencias.remove(req);
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	})

	app.post('/experiencia/criar', async (req, res) => {
		try {
			const result = await experiencias.create(req.body);
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	});

	app.get('/vagas', async (req, res) => {
		const vgs = await vagas.getAll();
		res.json(vgs);
	});

	app.post('/vagas/criar', async (req, res) => {
		try {
			const result = await vagas.create(req.body);
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	});
	
	app.delete('/vagas/apagar', async (req, res) => {
		try {
			const result = await vagas.remove(req.body);
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	});

	app.get('/reviews', async (req, res) => {
		const vgs = await reviews.getAll();
		res.json(vgs);
	});

	app.post('/reviews/criar', async (req, res) => {
		try {
			const result = await reviews.create(req.body);
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	});

	app.get('/empresa', async (req, res)=> {
		const emp = await empresas.getAll();
		res.json(emp);
	})
	
	app.get('/empresa/buscar', async (req, res) => {
		const emp = await empresas.getAll(req.query);
		res.json(emp);
	})

	app.post('/empresa/criar', async (req, res) => {
		try {
			const result = await empresas.create(req.query);
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	});
	
	app.post('/reviews/remover', async (req, res) => {
		try {
			const result = await reviews.remove(req.body);
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	})

	app.post('/empresa/editar', async (req, res) => {
		try {
			const result = await empresas.update(req.query);
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	});
}
