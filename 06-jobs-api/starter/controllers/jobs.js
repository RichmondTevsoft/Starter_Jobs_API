const Job = require('../models/Job') 
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError, NotFoundError} = require('../errors')

 
 const getAllJobs = async (req, res) => {
   const  jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt')
   res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
 }

 const getJob = async (req, res) => {
   const {
      user: { userId },  //get userID
      params: { id:jobId } //get Job ID
   } = req;

   const job = await Job.findOne({
      _id: jobId, 
      createdBy: userId
   })
   
   if (!job) {
      throw new NotFoundError(`No job found with ID ${jobId}`)
   }

   res.status(StatusCodes.OK).json({ job })
 }

 const createJob = async (req, res) => {
   req.body.createdBy = req.user.userId    //Getting the created by ID
   const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
 }

 const updateJob = async (req, res) => {
   //Destructure request object
   const {
      body: {company, position, status},
      user: { userId },  //get userID
      params: { id:jobId } //get Job ID
   } = req;

   if (company === '' || position === '' || status === ''){
      throw new BadRequestError('Company or position or status cannot be empty')
   }

   const job = await Job.findByIdAndUpdate({_id:jobId, createdBy:userId}, req.body, {new:true, runValidators:true})

   if (!job) {
      throw new NotFoundError(`No job found with ID ${jobId}`)
   }

   res.status(StatusCodes.OK).json({ job })
 }

 const deleteJob = async (req, res) => {
    res.send('delete jobs')
 }


 module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
 }