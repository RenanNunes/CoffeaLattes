const experiencias = require('../db/experiencias.js');
const vagas = require('../db/vagas.js');
const reviews = require('../db/reviews.js');

module.exports = function(app) {

	app.get('/', (req, res) => {
		res.json({
			message: 'HomePage'
		});
	});
	app.get('/experiencia', async (req, res) => {
		const exp = await experiencias.getAll();
		res.json(exp);
	})
	app.post('/experiencia/buscar', async (req, res) => {
		const exp = await experiencias.getAll();
		res.json(exp);
	})

	app.post('/experiencia/criar', async (req, res) => {
		try {
			const result = await experiencias.create(req.body);
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	})

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
	
	app.post('/vagas/remover', async (req, res) => {
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
	
	app.post('/reviews/remover', async (req, res) => {
		try {
			const result = await reviews.remove(req.body);
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	});
}
