import {mongooseConnect} from "@/lib/mongoose";
import {Blog} from '@/models/blog';

export default async function handle(req, res){
    const {method} = req;
    await mongooseConnect();

    if (method === 'GET') {
        console.log('Query params:', req.query);
        if(req.query?.id){
        //fetch single blog by id
        const blog = await Blog.findById(req.query.id);
        res.json(blog);
        }else if(req.query?.blogcategory){
            //fetch  blog by blog topic
            const cate = await Blog.find({ blogcategory: req.query.blogcategory });
            console.log('all res is in api blog topic',cate)
            res.json(cate.reverse());
        } else if(req.query?.tags){
            console.log('Entering tags condition')
                const tag = await Blog.find({ tags: req.query.tags });
                console.log('all res is in api blog tag', tag);
                res.json(tag.reverse());
        } else if (req.query?.slug) {
            
            //fetch  blog by slug
            const url = await Blog.find({slug: req.query.slug});
            res.json(url.reverse());
        }else{
            //fetch all blog
            const blogs = await Blog.find();
            res.json(blogs.reverse());
        }
    }else{
        res.status(405).json({message:"Method not Allowed"})
    }
}