const experiencias = require('../db/experiencias.js');

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
	})
}
