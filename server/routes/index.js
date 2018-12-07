const experiencias = require('../db/experiencias.js');
const vagas = require('../db/vagas.js');
const reviews = require('../db/reviews.js');
const usuarios = require('../db/usuarios.js');

module.exports = function(app) {

	app.get('/', (req, res) => {
		res.json({
			message: 'HomePage'
		});
	});

	app.get('/experiencia', async (req, res) => {
		try	{
			const exp = await experiencias.getAll();
			res.json(exp);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	});

	app.get('/experiencia/buscar', async (req, res) => {
		const exp = await experiencias.getAll();
		res.json(exp);
	});

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

	app.get('/usuarios', async (req, res) => {
		try {
			const result = await usuarios.getAll();
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	});

	app.get('/usuarios/buscar', async(req, res) => {
		try{
			const result = await usuarios.search(req);
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	})

	app.post('/usuarios/criar', async (req, res) => {
		try {
			const result = await usuarios.create(req.body);
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	});

	app.post('/usuarios/editar', async (req, res) => {
		try {
			const result = await usuarios.update(req.body);
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	});

	app.delete('/usuarios/remover', async (req, res) => {
		try {
			const result = await usuarios.remove(req);
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	});
}
