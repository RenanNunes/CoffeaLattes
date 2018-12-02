const experiencias = require('../db/experiencias.js');

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
	app.get('/experiencia/buscar', async (req, res) => {
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
}
