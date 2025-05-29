import tourModel from "../models/tour.model.js";

class TourService {
    constructor(tourModel) {
        this.tourModel = tourModel;
    }
    async createTour({name, description, price, ratingsAverage, ratingQuantity, imgCover, duration, maxGroupSize}) {
        const tour = await this.tourModel.findOne({name : name});
        if(tour) {
            return {
                code : 404,
                message : 'Đã có chuyến đi',
            }
        }
        const createTour = await tourModel.create({
            name,
            description,
            price,
            ratingsAverage,
            ratingQuantity,
            imgCover,
            duration,
            maxGroupSize,
        })
        if(!createTour) {
            return {
                code : 404,
                message : 'Tạo chuyến đi thất bại',
            }
        }
        return {
            code : 200,
            message : 'Tạo thành công',
            data : createTour,
        }
    }
}

export default TourService;