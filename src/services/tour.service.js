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
    async deleteTour({id}) {
        const tour = await this.tourModel.findOne({_id : id});
        if(!tour) {
            return {
                code : 404,
                message : 'Không tìm thấy',
            }
        }
        await tour.deleteOne();
        return {
            code : 200,
            message : 'Xóa thành công',
        }
    }

    async updateTour(id, updateData) {
        try {
            const updatedTour = await this.tourModel.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true }
            );
            if (!updatedTour) {
                return {
                    code: 404,
                    message: 'Không tìm thấy chuyến đi',
                }
            }
            return {
                code: 200,
                message: 'Cập nhật thành công',
                data: updatedTour,
            }} catch (error) {
                return {
                    code: 500,
                    message: 'Cập nhật thất bại',
                    error: error.message,
                }
            }
    }

}

export default TourService;