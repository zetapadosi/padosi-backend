import { body, validationResult } from 'express-validator';

export const inputPostRules = () => [
	body('tages', 'Tages are require').not().isEmpty(),
	body('postText', 'Text is required to determine your idea').not().isEmpty(),
	body('tages', 'Tages should not be empty').isArray({ min: 1 }),
	body('tages.*', 'Tages langth should be in rage of 4 to  100 character').isLength({ min: 4, max: 100 }),
	body('postText', 'Text langth should be in rage of 30 to  1000 character').isLength({ min: 30, max: 1000 }),
];

export const validate = (req, res, next) => {
	const errors = validationResult(req);

	if (errors.isEmpty()) return next();

	const extractedErrors = [];
	errors.array().map((err) => {
		extractedErrors.push({ [err.location]: err.location, params: err.param, msg: err.msg });
	});
	return res.status(400).json({ errors: extractedErrors });
};
