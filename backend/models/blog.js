const {Schema, models, model} = require('mongoose');

const BlogSchema = new Schema({
   
    title:{type:String},
    description:{type:String},
    slug:{type:String,required:true},
    body:{type:String},
    blogcategory:[{type:String}],
    tags:[{type:String}],
    status: { type: String },
    mainImage: { type: String }
},
    { timestamps:true}  // this option will automatically manage createdat   abd updatedat fields
);
export const Blog = models.Blog || model('Blog',BlogSchema,'blogtest');