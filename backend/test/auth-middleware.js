const expect = require('chai').expect;
const jwt = require('jsonwebtoken');
const sinon = require('sinon');
const authMiddleware = require('../middleware/is-auth');

describe('authMiddleware', () => {
    it('should throw an error if no authorization header is present', () => {
        const req = {
            get: () => {
                return null;
            }
        };
        const res = {};
        const next = () => {};
        expect(authMiddleware.bind(this, req, res, next)).to.throw(Error, 'Not authenticated.');
    })

    it('should throw an error if the authorization header is only one string', () => {
        const req = {
            get: () => {
                return 'xyz';
            }
        };
        const res = {};
        const next = () => {};
        expect(authMiddleware.bind(this, req, res, next)).to.throw();
    })

    it('should yield a userId after decoding the token', () => {
        const req = {
            get: () => {
                return 'Bearer xyz';
            }
        };
        const res = {};
        const next = () => {};
        sinon.stub(jwt, 'verify')
        jwt.verify.returns({userId: 'abc'});
        authMiddleware(req, res, next);
        expect(req).to.have.property('userId');
        expect(jwt.verify.called).to.be.true;
        jwt.verify.restore();
    })


})

