import tourModel from "../models/tour.model.js";
import TourService from "../services/tour.service.js";
import { SuccessResponse } from "../middlewares/response.middleware.js";
const tourServiceInstance = new TourService(tourModel);

class TourController {
    constructor(tourServiceInstance) {
        this.tourServiceInstance = tourServiceInstance;
    }
    createTour = async (req, res) => {
        console.log(req.body);
        const {name, description, price, ratingsAverage, ratingQuantity, imgCover, duration, maxGroupSize} = req.body;
        const result = await this.tourServiceInstance.createTour({name, description, price, ratingsAverage, ratingQuantity, imgCover, duration, maxGroupSize});
        new SuccessResponse({code : result.code, message : result.message, data : result.accessToken}).send(res);
    }
}

export default new TourController(tourServiceInstance);