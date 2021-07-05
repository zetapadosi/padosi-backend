import _ from 'lodash';
import config from '../../config/config';

const { environment } = config;

export const extendedRequestMiddleware = (req, res, next) => {
	req.allParams = () => _.merge(req.params, req.query, req.body);

	res.set('x-application-identifier', `boilerplate-${environment}`);

	res.ok = (resPayload = {}) => {
		if (typeof resPayload === 'string') {
			return res.send({
				statusCode: 200,
				status: resPayload,
				value: {},
				message: res.__(resPayload),
			});
		}

		const { message = 'SUCCESS', value = {} } = resPayload;
		return res.status(200).send({
			statusCode: 200,
			status: message,
			message: res.__(message),
			value,
		});
	};

	res.created = ({ value, message }) => {
		return res.status(201).send({
			statusCode: 201,
			value: value,
			message: res.__(message),
		});
	};

	res.error = (resPayload, debugMessage) => {
		if (typeof resPayload === 'string') {
			return res.status(400).send({
				statusCode: 400,
				status: resPayload,
				error: res.__(resPayload),
				message: res.__(resPayload),
				value: {},
			});
		}

		const { statusCode = 400, message = 'BAD_REQUEST', value = {} } = resPayload;

		return res.status(statusCode).send({
			statusCode,
			status: message,
			message: res.__(message),
			error: res.__(message),
			value,
		});
	};

	res.internalServerError = (e) => {
		return res.status(500).send({
			statusCode: 500,
			status: 'SOME_ERROR_OCCURRED',
			message: res.__('SOME_ERROR_OCCURRED'),
			error: res.__('SOME_ERROR_OCCURRED'),
			value: {},
		});
	};

	res.unauthorized = (message = '') => {
		return res.status(401).send({
			statusCode: 401,
			status: 'UNAUTHORIZED',
			message: res.__('UNAUTHORIZED'),
			value: {},
			error: res.__('UNAUTHORIZED'),
		});
	};

	res.forbidden = () => {
		return res.status(403).send({
			statusCode: 403,
			status: 'FORBIDDEN',
			message: res.__('FORBIDDEN'),
			value: {},
			error: res.__('FORBIDDEN'),
		});
	};

	next();
};
