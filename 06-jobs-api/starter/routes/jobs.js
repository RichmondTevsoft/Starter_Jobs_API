const express = require('express');
const router = express.Router();

//Import jobs controller
const {getAllJobs, getJob, createJob, updateJob, deleteJob} = require('../controllers/jobs');

//Route for getAllJobs
router.get('/', getAllJobs);

//Route for getJob
router.get('/:id', getJob);

//Route for createJob
router.post('/', createJob);

//Route for updateJob
router.patch('/:id', updateJob);

//Router for deleteJob
router.delete('/:id', deleteJob);

module.exports = router;