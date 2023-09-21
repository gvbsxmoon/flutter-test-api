const jwt = require('jsonwebtoken');

const secret: string = require('crypto').randomBytes(64).toString('hex');

export const generateAuthToken = (id: string): string => {
	return jwt.sign({ id }, secret, { expiresIn: '604800s' });
};

export const verifyAuthToken = (headers: any): boolean => {
	const authorization = JSON.parse(JSON.stringify(headers))['authorization'];
	const token = authorization && authorization.split(' ')[1];

	try {
		const { id } = jwt.verify(token, secret);
		return id === 'admin';
	} catch (err) {
		return false;
	}
};
