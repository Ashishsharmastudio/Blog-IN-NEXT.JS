const {Schema, models, model} = require('mongoose');

const BlogSchema = new Schema({
    mainImage: { type: String },
    title:{type:String},
    slug:{type:String,required:true},
    description:{type:String},
    blogcategory:[{type:String}],//markdown content
    tags:[{type:String}],
    status:{type:String},
},
    { timestams:true}  // this option will automatically manage createdat   abd updatedat fields
);
export const Blog = models.Blog || model('Blog',BlogSchema,'blogtest');