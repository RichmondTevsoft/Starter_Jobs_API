const express = require('express');
const router = express.Router();

//Import jobs controller
const {getAllJobs, getJob, createJob, updateJob, deleteJob} = require('../controllers/jobs');

//Route for getAllJobs
router.get('/getjobs', getAllJobs);

//Route for getJob
router.get('/getjob/:id', getJob);

//Route for createJob
router.post('/createjob', createJob);

//Route for updateJob
router.put('/updatejob/:id', updateJob);

//Router for deleteJob
router.delete('deletejob/:id', deleteJob);

module.exports = router;