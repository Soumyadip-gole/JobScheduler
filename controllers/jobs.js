const JobModel = require('../models/Job');
const CustomAPIError = require('../errors/customerror');
const { StatusCodes } = require('http-status-codes');


const getalljob = async (req, res) => {
    const jobs = await JobModel.find({ user: req.user.userId }).sort('createdAt');


    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getjob = async (req, res) => {
    const { userId } = req.user;
    const { id: jobId } = req.params;

    try {
        const job = await JobModel.findOne({ _id: jobId, user: userId });
        if (!job) {
            throw new CustomAPIError(`No job found with id: ${jobId} for this user`, StatusCodes.NOT_FOUND);
        }
        res.status(StatusCodes.OK).json({ job });
    } catch (error) {
        if (error.name === 'CastError') {
            throw new CustomAPIError(`Invalid job ID format: ${jobId}`, StatusCodes.BAD_REQUEST);
        }
        throw error; // Let other errors propagate to the global handler
    }
};

const createjob = async (req, res) => {
    req.body.user = req.user.userId;
    const { company, position } = req.body;
    if (!company || !position) {
        throw new CustomAPIError('Please provide company and position', StatusCodes.BAD_REQUEST);
    }
    try {
        const job = await JobModel.create(req.body);
        res.status(StatusCodes.CREATED).json({ job });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message).join(', ');
            throw new CustomAPIError(messages, StatusCodes.BAD_REQUEST);
        }
        throw error;
    }
};

const updatejob = async (req, res) => {
    const { userId } = req.user;
    const { id: jobId } = req.params;
    const { company, position } = req.body;

    if (company === '' || position === '') {
        throw new CustomAPIError('Company and Position fields cannot be empty if provided', StatusCodes.BAD_REQUEST);
    }

    try {
        const job = await JobModel.findOneAndUpdate(
            { _id: jobId, user: userId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!job) {
            throw new CustomAPIError(`No job found with id: ${jobId} for this user to update`, StatusCodes.NOT_FOUND);
        }
        res.status(StatusCodes.OK).json({ job });
    } catch (error) {
        if (error.name === 'CastError') {
            throw new CustomAPIError(`Invalid job ID format: ${jobId}`, StatusCodes.BAD_REQUEST);
        }
        if (error.name === 'ValidationError') { // Mongoose validation error from runValidators
            const messages = Object.values(error.errors).map(val => val.message).join(', ');
            throw new CustomAPIError(messages, StatusCodes.BAD_REQUEST);
        }
        throw error;
    }
};

const deletejob = async (req, res) => {
    const { userId } = req.user;
    const { id: jobId } = req.params;

    try {
        const job = await JobModel.findOneAndDelete({ _id: jobId, user: userId });
        if (!job) {
            throw new CustomAPIError(`No job found with id: ${jobId} for this user to delete`, StatusCodes.NOT_FOUND);
        }
        res.status(StatusCodes.OK).json({ msg: 'Job successfully deleted', job });
    } catch (error) {
        if (error.name === 'CastError') {
            throw new CustomAPIError(`Invalid job ID format: ${jobId}`, StatusCodes.BAD_REQUEST);
        }
        throw error;
    }
};

module.exports = { getalljob, getjob, createjob, updatejob, deletejob };
