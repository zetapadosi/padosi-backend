import { body, validationResult } from 'express-validator';

export const inputPostRules = () => [
	body('tags', 'Tages are require').not().isEmpty(),
	body('postText', 'Text is required to determine your idea').not().isEmpty(),
	body('tags', 'Tages should not be empty').isArray({ min: 1 }),
	body('tags.*', 'Tages langth should be in rage of 3 to  100 character').isLength({ min: 3, max: 100 }),
	body('postText', 'Text langth should be in rage of 30 to  2650 character').isLength({ min: 30, max: 2650 }),
];

export const inputCommentRules = () => [
	body('commentText', 'Comment should be in range of 30 to 750 character').isLength({ min: 30, max: 750 }),
];
export const inputBioRules = () => [
	body('bioText', 'Bio text should be in range from 30 to 750').isLength({ min: 30, max: 750 }),
];
export const inputDistanceRules = () => [
	body('distance', 'Distance rage is from 1 to 10 Km').isNumeric({ min: 1, max: 10 }),
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
