import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
import app from '../express';
import { userOutputData } from './outputData';

const newReq = chai.request('http://localhost:8989/api').keepOpen();

describe('Test the User routes ', () => {
	let token = '';

	context('Checking the register Route ', () => {
		it('#login', async () => {
			try {
				const res = await newReq.post('/auth/login').send({
					email: 'dixitvora2020@gmail.com',
					userFrom: 'google',
				});
				expect(res.status).to.be.equal(200);
				expect(res.body.message).toString();
				expect(res.body.value).to.haveOwnProperty('user');
				expect(res.body.value).to.haveOwnProperty('token');
				token = res.body.value.token;
			} catch (e) {
				console.error(e.message);
			}
		}).timeout(1500);
	});
});
