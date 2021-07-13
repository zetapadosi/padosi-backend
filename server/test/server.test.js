import chai, { expect } from 'chai';
import app from '../express';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

const newReq = chai.request(app);
describe('Testing the app', () => {
	it('Checking the ping route', async () => {
		const res = await newReq.get('/ping');
		expect(res.body.msg).to.be.equal('Success');
		expect(res.body.data).to.be.equal('Pong');
		expect(res.status).to.be.equal(200);
	});
});
