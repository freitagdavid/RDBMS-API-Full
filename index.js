const express = require('express');
const knex = require('knex');
const path = require('path');

const knexConfig = require('./knexfile.js');

const server = express();
server.use(express.json());
const db = knex(knexConfig.development);

server.get('/', ({ res }) => {
    // res.redirect('https://www.youtube.com/watch?v=0VkrUG3OrPc');
    res.sendFile(path.join(__dirname + '/its_alive.html'));
});

server.post('/api/cohorts', (req, res) => {
    if (!req.body.name) {
        res.status(400).json({ errMessage: 'Please include a cohort name' });
        return;
    }
    db('cohorts')
        .insert(req.body)
        .then(result => {
            res.status(200).json({ result });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.get('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts')
        .where({ id: id })
        .then(result => {
            if (result.length === 0) {
                res.status(404).json({
                    errMessage: 'Cohort by this ID does not exist.',
                });
            } else {
                res.status(200).json(result);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

server.get('/api/cohorts/:id/students', (req, res) => {
    const { id } = req.params;
    db('students')
        .where({ cohort_id: id })
        .then(result => {
            if (!result.length === 0) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    errMessage: 'Cohort by this ID does not exist.',
                });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.put('/api/cohorts/:id', (req, res) => {
    if (!req.body.name) {
        res.status(400).json({
            errMessage: 'Please include the cohort name.',
        });
        return;
    }

    const { id } = req.params;
    db('cohorts')
        .where({ id: id })
        .update(req.body)
        .then(result => {
            if (result === 0) {
                res.status(404).json({
                    errMessage: 'Cohort by this id does not exist.',
                });
                return;
            }
            res.status(200).json({
                success: 'Successfully updated cohort.',
            });
        });
});

server.delete('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts')
        .where({ id: id })
        .del()
        .then(result => {
            if (result === 0) {
                res.status(404).json({
                    errMessage: 'Cohort by this id does not exist',
                });
                return;
            }
            res.status(200).json({
                success: 'Successfully deleted the cohort',
            });
        })
        .catch(err => {
            res.status(500).json({
                errMessage: 'Something has gone horribly wrong.',
            });
        });
});

server.listen(10000, () => console.log('Server is listening on port 10000'));
