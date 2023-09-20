import Elysia, { t } from 'elysia';
import { verifyAuthToken } from '../utils/jwt';
import { sessions } from '../utils/mock';

const sessionTType = t.Object({
	id: t.Number(),
	room: t.Object({
		id: t.Number(),
		name: t.String(),
		cameras: t.Array(
			t.Object({
				id: t.Number(),
				status: t.String(),
			}),
		),
	}),
	guest: t.Object({
		id: t.Number(),
		name: t.String(),
		car: t.Object({
			id: t.Number(),
			brand: t.String(),
			model: t.String(),
			plate: t.String(),
		}),
		initDate: t.Number(),
	}),
	status: t.String(),
});

const session = new Elysia().group('/session', session =>
	session
		.get(
			'/',
			({ set }) => {
				set.status = 200;
				return sessions;
			},
			{
				response: {
					200: t.Array(sessionTType),
					400: t.String(),
				},
				beforeHandle: ({ set, request: { headers } }) => {
					if (!verifyAuthToken(headers)) {
						set.status = 401;
						return 'Unauthorized';
					}
				},
				detail: {
					summary: 'Get all sessions',
					tags: ['session'],
				},
			},
		)
		.get(
			'/:id',
			({ params: { id }, set }) => {
				const found = sessions.find(session => session.id === parseInt(id));

				if (found) {
					set.status = 200;
					return found;
				}

				set.status = 404;
				return `No items found with id ${id}.`;
			},
			{
				response: {
					200: sessionTType,
					404: t.String(),
				},
				beforeHandle: ({ set, request: { headers } }) => {
					if (!verifyAuthToken(headers)) {
						set.status = 401;
						return 'Unauthorized';
					}
				},
				detail: {
					summary: 'Get a session by id',
					tags: ['session'],
				},
			},
		)
		.delete(
			'/:id',
			({ params: { id }, set }) => {
				const elIndex = sessions.findIndex(session => session.id === parseInt(id));

				if (elIndex !== -1) {
					sessions.splice(elIndex, 1);
					set.status = 200;
					return `Item with id ${id} correctly deleted.`;
				}

				set.status = 404;
				return `No items found with id ${id}.`;
			},
			{
				response: {
					200: t.String(),
					404: t.String(),
				},
				beforeHandle: ({ set, request: { headers } }) => {
					if (!verifyAuthToken(headers)) {
						set.status = 401;
						return 'Unauthorized';
					}
				},
				detail: {
					summary: 'Delete a session by id',
					tags: ['session'],
				},
			},
		)
		.post(
			'/',
			({ body, set }) => {
				if (body && body.session) {
					sessions.push(body.session as SessionModel);
					set.status = 201;
					return body.session;
				}

				set.status = 400;
				return `Element must be valid.`;
			},
			{
				body: t.Object({
					session: sessionTType,
				}),
				response: {
					201: sessionTType,
					400: t.String(),
				},
				beforeHandle: ({ set, request: { headers } }) => {
					if (!verifyAuthToken(headers)) {
						set.status = 401;
						return 'Unauthorized';
					}
				},
				detail: {
					summary: 'Add a new session',
					tags: ['session'],
				},
			},
		)
		.put(
			'/:id',
			({ params: { id }, set, body }) => {
				const elIndex = sessions.findIndex(session => session.id === parseInt(id));

				if (elIndex) {
					sessions[elIndex] = { ...sessions[elIndex], ...(body.session as SessionModel) };
					set.status = 200;
					return sessions[elIndex];
				}

				set.status = 404;
				return `No items found with id ${id}.`;
			},
			{
				body: t.Object({
					session: sessionTType,
				}),
				response: {
					200: sessionTType,
					404: t.String(),
				},
				beforeHandle: ({ set, request: { headers } }) => {
					if (!verifyAuthToken(headers)) {
						set.status = 401;
						return 'Unauthorized';
					}
				},
				detail: {
					summary: 'Get a session by id',
					tags: ['session'],
				},
			},
		),
);

export default session;
