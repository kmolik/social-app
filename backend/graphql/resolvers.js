const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Post = require('../models/post');


module.exports= {
    createUser: async (args, req) => {
        const errors = [];
        if(!validator.isEmail(args.userInput.email)) {
            errors.push({message: 'Email is invalid'});
        }
        if(
            validator.isEmpty(args.userInput.password) ||
            !validator.isLength(args.userInput.password, {min: 5})
        ) {
            errors.push({message: 'Password too short'});
        }
        if(errors.length > 0) {
            const error = new Error('Invalid input.');
            error.data = errors;
            error.statusCode = 422;
            throw error;
        }
        const existingUser = await User.findOne({email: args.userInput.email});
        if(existingUser) {
            const error = new Error('User exists already.');
            error.statusCode = 422;
            throw error;
        }
        const hashedPw = await bcrypt.hash(args.userInput.password, 12);
        const user = new User({
            name: args.userInput.name,
            email: args.userInput.email,
            password: hashedPw
        });
        const createdUser = await user.save();
        return {...createdUser._doc, password: null, _id: createdUser._id.toString()};
    },

    login: async ({email, password}, req) => {
        const user = await User.findOne({email: email});
        if(!user) {
            const error = new Error('User not found.');
            error.statusCode = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual) {
            const error = new Error('Password is incorrect.');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            userId: user._id.toString(),
            email: user.email
            },
            'somesupersecretkey', {
            expiresIn: '1h'
        });
        return { token: token, userId: user._id.toString()};
    },

    createPost : async ({postInput}, req) => {
        if(!req.isAuth) {
            const error = new Error('Not authenticated.');
            error.statusCode = 401;
            throw error;
        }
        const errors = [];
        if(
            validator.isEmpty(postInput.title) ||
            !validator.isLength(args.userInput.password, {min: 5})
        ) {
            errors.push({message: 'Title is invalid'});
        }
        if(validator.isEmpty(postInput.content) ||
            !validator.isLength(args.userInput.password, {min: 5})
        ) {
            errors.push({message: 'Content is invalid'});
        }
        if(errors.length > 0) {
            const error = new Error('Invalid input.');
            error.data = errors;
            error.statusCode = 422;
            throw error;
        }
        const user = await User.findById(req.userId);
        if(!user) {
            const error = new Error('User not found.');
            error.statusCode = 401;
            throw error;
        }
        const post = new Post({
            title: postInput.title,
            content: postInput.content,
            imageUrl: postInput.imageUrl,
            creator: user
        });
        const createdPost = await post.save();
        user.posts.push(createdPost);
        await user.save();
        return {
            ...createdPost._doc,
            _id: createdPost._id.toString(),
            createdAt: createdPost.createdAt.toISOString(),
            updatedAt: createdPost.updatedAt.toISOString()
        };
    },

    posts: async ({page}, req) => {
        if(!req.isAuth) {
            const error = new Error('Not authenticated.');
            error.statusCode = 401;
            throw error;
        }
        if(!page) {
            page = 1;
        }
        const perPage = 2;
        const totalPosts = await Post.find().countDocuments();
        const posts = await Post
            .find()
            .sort({createdAt: -1})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .populate('creator');

        return {
            posts: posts.map(post => {
                return {
                    ...post._doc,
                    _id: post._id.toString(),
                    createdAt: post.createdAt.toISOString(),
                    updatedAt: post.updatedAt.toISOString()
                };
            }),
            totalPosts: totalPosts
        };
    },
    post: async ({id}, req) => {
        if(!req.isAuth) {
            const error = new Error('Not authenticated.');
            error.statusCode = 401;
            throw error;
        }
        const post = await Post.findById(id).populate('creator');
        if(!post) {
            const error = new Error('Post not found.');
            error.statusCode = 404;
            throw error;
        }
        return {
            ...post._doc,
            _id: post._id.toString(),
            createdAt: post.createdAt.toISOString(),
            updatedAt: post.updatedAt.toISOString()
        };
    },
    updatePost: async ({id, postInput}, req) => {
        if(!req.isAuth) {
            const error = new Error('Not authenticated.');
            error.statusCode = 401;
            throw error;
        }
        const post = await Post.findById(id).populate('creator');
        if(!post) {
            const error = new Error('Post not found.');
            error.statusCode = 404;
            throw error;
        }
        if(post.creator._id.toString() !== req.userId) {
            const error = new Error('Not authorized.');
            error.statusCode = 403;
            throw error;
        }
        if(postInput.title) {
            post.title = postInput.title;
        }
        if(postInput.content) {
            post.content = postInput.content;
        }
        if(postInput.imageUrl !== 'undefined') {
            post.imageUrl = postInput.imageUrl;
        }
        const updatedPost = await post.save();
        return {
            ...updatedPost._doc,
            _id: updatedPost._id.toString(),
            createdAt: updatedPost.createdAt.toISOString(),
            updatedAt: updatedPost.updatedAt.toISOString()
        };
    },
    deletePost: async ({id}, req) => {
        if(!req.isAuth) {
            const error = new Error('Not authenticated.');
            error.statusCode = 401;
            throw error;
        }
        const post = await Post.findById(id);
        if(!post) {
            const error = new Error('Post not found.');
            error.statusCode = 404;
            throw error;
        }
        if(post.creator.toString() !== req.userId) {
            const error = new Error('Not authorized.');
            error.statusCode = 403;
            throw error;
        }
        await Post.findByIdAndRemove(id);
        const user = await User.findById(req.userId);
        user.posts.pull(id);
        await user.save();
        return true;
    }
}