import chai, { expect } from 'chai';

import chaiHttp from 'chai-http';
chai.use(chaiHttp);

const newReq = chai.request('http://localhost:8989/api').keepOpen();
describe('Test the User routes ', () => {
	let token = '';

	context('Checking the register Route ', () => {
		it('#register', async () => {
			try {
				const res = await newReq.post('/user/register').send({
					name: 'Dixit Vora',
					email: 'dixitvora2020@gmail.com',
					picture: 'https://robohash.org/1PU.png?set=set2&size=150x150',
					userFrom: 'google',
					latitude: 22.3016,
					longitude: 70.765,
				});
				expect(res.status).to.be.equal(200);
				expect(res.body.message).toString();
				expect(res.body.value).to.haveOwnProperty('user');
				expect(res.body.value).to.haveOwnProperty('token');
			} catch (e) {
				console.error(e.message);
			}
		}).timeout(1500);
	});
	(() => newReq.close())();
});
