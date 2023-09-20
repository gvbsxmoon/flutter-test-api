import Elysia, { t } from 'elysia';
import { sessions } from '../utils/mock';
import { generateAuthToken } from '../utils/jwt';
const user = new Elysia();

const login = (id: string): string => {
	const token = generateAuthToken(id);

	switch (id) {
		case 'admin':
			return JSON.stringify({
				token,
				permission: ['*'],
			});
		case 'lnatale':
			return JSON.stringify({
				token,
				...sessions[0],
			});
		case 'sbignotti':
			return JSON.stringify({
				token,
				...sessions[1],
			});
		default:
			return 'Invalid or missing ID.';
	}
};

user.post(
	'/login',
	({ body, set }) => {
		if (body.id) {
			set.status = 200;
			return login(body.id.trim());
		}

		set.status = 400;
		return 'Invalid or missing ID.';
	},
	{
		body: t.Object({
			id: t.String(),
		}),
		response: {
			200: t.String(),
			400: t.String(),
		},
		detail: {
			summary: 'Let the admin login',
			tags: ['user'],
		},
	},
);

export default user;
