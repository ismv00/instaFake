const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');




module.exports ={
    async index(req, res) {
        const post  = await Post.find().sort('-createdAt');

        return res.json(post);
    },
//metodo para criar um post (store)
    async store(req, res){

        const { author, place, description, hashtags } = req.body;
        const { filename: image  } = req.file;

        const [name] = image.split('.');
        const filename = `${name}.jpg`;

        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', filename)
            )
        fs.unlinkSync(req.file.path);


        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: filename,
        });

        req.io.emit('post' , post);
        return res.json(post)
    },

    // async delete(req, res){
    //     const post = await Post.deleteOne({ _id:req.params.id});

    //     return res.json(post, {message: "post apagado com sucesso"});
    // }

    
};