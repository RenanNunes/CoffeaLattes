const experiencias = require('../db/experiencias.js');
const vagas = require('../db/vagas.js');
const reviews = require('../db/reviews.js');
const usuarios = require('../db/usuarios.js');
const empresas = require('../db/empresas.js');

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
			const result = await experiencias.create(req.body, req.headers.token);
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
			const result = await reviews.create(req.body && req.body.review);
			const expUpdated = await experiencias.addReview(req.body && req.body.exp, result['_id']);
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	});
		
	app.delete('/reviews/apagar', async (req, res) => {
		try {
			const result = await reviews.remove(req.body);
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	})

	app.get('/empresas', async (req, res) => {
		const emp = await empresas.search(req.query);
		res.json(emp);
	})

	app.post('/empresas', async (req, res) => {
		try {
			const result = await empresas.create(req.body);
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	});

	app.delete('/empresas', async (req, res) => {
		const emp = await empresas.remove(req.query);
		res.json(emp);
	});

	app.put('/empresas', async (req, res) => {
		try {
			const result = await empresas.update(req.query);
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	});

	app.get('/usuarios', async(req, res) => {
		try{
			const result = await usuarios.search(req);
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	})

	app.post('/usuarios', async (req, res) => {
		try {
			const result = await usuarios.create(req.body);
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	});

	app.put('/usuarios', async (req, res) => {
		try {
			const result = await usuarios.update(req.body);
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	});

	app.delete('/usuarios', async (req, res) => {
		try {
			const result = await usuarios.remove(req);
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	});

	app.post('/login', async (req, res) => {
		try {
			const result = await usuarios.login(req);
			res.json(result);
		} catch (error) {
			res.status(500);
			res.json(error);
		}
	});
}
