module.exports = (app) => {
    const CSV = require('../controllers/csv.controller');

    app.get('/fetchData',CSV.FindAll);

    app.get('/fetch/:text',CSV.FindConditional);

    app.post('/genratecsv',CSV.GenerateCSV);
}