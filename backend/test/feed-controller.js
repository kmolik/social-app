const expect = require('chai').expect;
const mongoose = require('mongoose');

const User = require('../models/user');
FeedController = require('../controllers/feed');

describe('Feed Controller', () => {
    before((done) => {
        mongoose
            .connect(`mongodb+srv://user:L0rdR3van@node-shop.vtbu2.mongodb.net/test-messages?retryWrites=true`)
            .then(() => {
                const user = new User({
                    email: 'test@mail.com',
                    name: 'Test',
                    password: 'test',
                    posts: [],
                    _id: '62f237f52a9b37e9b36977bf'
                });
                return user.save();
            })
            .then(() => {
                done();
            });
    });

    it('should add a created post to the posts array of the user', (done) => {
        const req = {
            body: {
                title: 'Test Title',
                content: 'Test Content'
            },
            file: {
                path: 'abc'
            },
            userId: '62f237f52a9b37e9b36977bf'
        }
        const res = {
            status: () => {
                return this;
            },
            json: () => {}
        }
        FeedController
            .createPost(req, res, () => {})
            .then(savedUser => {
                expect(savedUser).to.have.property('posts');
                expect(savedUser.posts).to.have.lengthOf(1);
                done();
            })
            .catch(err => {})
        done();
    })


    after((done) => {
        User.deleteMany({})
            .then(() => {
                return mongoose.disconnect();
            })
            .then(() => {
                done();
            })
            .catch(err => {
                done(err);
            });
    });
});