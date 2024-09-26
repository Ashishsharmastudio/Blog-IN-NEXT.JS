
import { mongooseconnect } from "@/lib/mongoose";
import {Blog} from '@/models/blog';

export default async function handle(req,res){
    // if authenticated, connect to Mongodb
    await mongooseconnect();

    const {method} = req;
//data send or post
    if(method === 'POST'){
        const {title,description,slug,body,blogcategory,tags,status,mainImage} = req.body;
        const blogDoc = await Blog.create({
            title,description, slug, body, blogcategory, tags, status, mainImage
        });
        res.json(blogDoc);
    }
    // data fetch and get
    if(method === 'GET'){
        if(req.qery?.id){
            res.json(await Blog.findById(req.query.id));

        }else{
            res.json((await Blog.find()).reverse())
        }
    }
    if(method === 'PUT'){
        const {_id,title,description,slug,body,blogcategory,tags,status,mainImage} = req.body;
        await Blog.updateOne({ _id }, {
            title,description, slug, body, blogcategory, tags, status, mainImage
        }, { new: true });
        res.json(true)
    }
    // delete one blog
    if(method==='DELETE'){
        if(req.query?.id){
            await Blog.deleteOne({_id:req.query?.id})
            res.json(true);
        }
    }
    
}