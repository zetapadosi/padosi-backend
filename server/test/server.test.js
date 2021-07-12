import { expect } from 'chai';
import app from '../express';
import request from 'supertest';

const newRequest = request(app);
describe('Testing the app', () => {
	it('Checking the ping route', async () => {
		const res = await newRequest.get('/ping');
		expect(res.body.msg).to.be.equal('Success');
		expect(res.body.data).to.be.equal('Pong');
		expect(res.status).to.be.equal(200);
	});
});
