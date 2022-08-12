const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const AuthController = require('../controllers/auth');

describe('Auth Controller -Login', () => {
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
    })


    it('should throw an error with code 500 if accessing the database fails', (done) => {
        sinon.stub(User, 'findOne');
        User.findOne.throws();
        const req = {
            body: {
                email: 'test@test.com',
                password: 'test'
            }
        }
        AuthController.login(req, {}, () => {}).then(result => {
            expect(result).to.be.an('error');
            expect(result.statusCode).to.equal(500);
            done();
        }).catch(err => {
            done(err);
        });
        /*const res = {
            status: sinon.stub().returns({
                json: sinon.stub().returns({})
            })

        }
        const next = sinon.stub();
        AuthController.login(req, res, next);
        expect(next.calledOnce).to.be.true;*/
        User.findOne.restore();
    })

    it('should send a response with valid user status if user is found', (done) => {
        const req = {userId: '62f237f52a9b37e9b36977bf'};
        const res = {
            statusCode:500,
            userStatus: null,
            status: (code) => {
                this.statusCode = code;
                return this;
            },
            json: (data) => {
                this.userStatus = data.status;
            }
        };
        AuthController
            .getUserStatus(req,res, () => {})
            .then(() => {
                expect(res.statusCode).to.be.equal(200);
                expect(res.userStatus).to.be.equal('active');
                done();
            })
        done();
    });

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