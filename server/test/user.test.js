import chai, { expect } from 'chai';
import mongoose from 'mongoose';
import User from '../model/userModel';

import chaiHttp from 'chai-http';
chai.use(chaiHttp);

const userProfile = {
	name: 'Dixit Vora',
	email: 'james@gmail.com',
	picture: 'https://robohash.org/1PU.png?set=set2&size=150x150',
	userFrom: 'google',
	latitude: 22.3016,
	longitude: 70.765,
};

const newReq = chai.request('http://localhost:8989/api').keepOpen();

describe('Test the User routes ', async () => {
	let token;
	let userId;
	// Register a User Route
	context('Checking the register Route ', () => {
		it('#register', async () => {
			try {
				const res = await newReq.post('/user/register').send({
					name: userProfile.name,
					email: userProfile.email,
					picture: userProfile.picture,
					userFrom: userProfile.userFrom,
					latitude: userProfile.latitude,
					longitude: userProfile.longitude,
				});
				expect(res.status).to.be.equal(200);
				expect(res.body.message).toString();
				expect(res.body.value).to.haveOwnProperty('user');
				expect(res.body.value).to.haveOwnProperty('token');
			} catch (e) {
				console.error(e.message);
			}
		});
	});

	// Login User
	context('Checking Login route ', () => {
		it('#login', async () => {
			try {
				const res = await newReq.post('/auth/login').send({
					email: userProfile.email,
					userFrom: userProfile.userFrom,
				});
				expect(res.status).to.be.equal(200);
				expect(res.body.message).toString();
				expect(res.body.value).to.haveOwnProperty('user');
				expect(res.body.value).to.haveOwnProperty('token');
				userId = res.body.value.user.userId;
				token = res.body.value.token;
			} catch (e) {
				console.error(e.message);
			}
		});
	});
	// Get user Profile by id
	context('Get User Profile of the user ', () => {
		it('#userProfile', async () => {
			try {
				const res = await newReq.get(`/user/${userId}`).set('Authorization', `Bearer ${token}`);
				expect(res.status).to.be.equal(200);
				expect(res.body.message).toString();
				expect(res.body.value).to.haveOwnProperty('name');
			} catch (e) {
				console.log(e.message);
			}
		});
	});
	await User.deleteOne({ userId: `${userId}` });
	(() => newReq.close())();
	done();
});
