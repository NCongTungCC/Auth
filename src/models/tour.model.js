import mongoose from 'mongoose';
import slugify from 'slugify';
const TourSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Vui lòng nhập tên chuyến đi'],
    },
    description : {
        type : String,
        required : [true, 'Vui lòng nhập mô tả'],
    },
    price : {
        type : Number,
        required : [true, 'Vui lòng nhập giá'],
    },
    ratingsAverage : {
        type : Number,
        default : 0,
        min : 1,
        max : 5
    },
    ratingQuantity : {
        type : Number,
        default : 0,
    },
    imgCover : {
        type : String,
        required : [true, 'Vui lòng chọn ảnh minh họa'],
    },
    duration : {
        type : Number, 
        required : [true, 'Vui lòng nhập số ngày đi']
    },
    maxGroupSize : {
        type : Number,
        required : [true, 'Vui lòng số lượng người tối đa']
    },
    slug : String,
},{
    timestamps : true,
})

TourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export default mongoose.model('TourModel', TourSchema, 'tours')