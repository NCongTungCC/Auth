import tourModel from "../models/tour.model.js";
import TourService from "../services/tour.service.js";
import { SuccessResponse } from "../middlewares/response.middleware.js";
const tourServiceInstance = new TourService(tourModel);

class TourController {
    constructor(tourServiceInstance) {
        this.tourServiceInstance = tourServiceInstance;
    }
    createTour = async (req, res) => {
        const {name, description, price, ratingsAverage, ratingQuantity, imgCover, duration, maxGroupSize} = req.body;
        const result = await this.tourServiceInstance.createTour({name, description, price, ratingsAverage, ratingQuantity, imgCover, duration, maxGroupSize});
        new SuccessResponse({code : result.code, message : result.message, data : result.data}).send(res);
    }
    deleteTour = async (req, res) => {
        const { id } = req.params;
        const result = await this.tourServiceInstance.deleteTour({id});
        new SuccessResponse({code : result.code, message : result.message, data : result.data}).send(res);
    }
    updateTour = async (req, res) => {
        const { id } = req.params;
        const updateData = req.body; 
        const result = await this.tourServiceInstance.updateTour(id, updateData);
        new SuccessResponse({code : result.code, message : result.message, data : result.data}).send(res);
    }
    getTour = async (req, res) => {
        const limit = req.query.limit || 0;
        const page = req.query.page || 0;
        const offset = (page - 1) * limit;
        const result = await this.tourServiceInstance.getTour({limit, offset});
        new SuccessResponse({code : result.code, message : result.message, data : result.data}).send(res);
    }
    getTourById = async (req, res) => {
        const {id} = req.params;
        const result = await this.tourServiceInstance.getTourById({id});
        new SuccessResponse({code : result.code, message : result.message, data : result.data}).send(res);
    }
}

export default new TourController(tourServiceInstance);