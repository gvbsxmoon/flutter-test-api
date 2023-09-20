import Elysia, { t } from 'elysia';
import { verifyAuthToken } from '../utils/jwt';
import { rooms } from '../utils/mock';

const roomTType = t.Object({
	id: t.Number(),
	name: t.String(),
	cameras: t.Array(
		t.Object({
			id: t.Number(),
			status: t.String(),
		}),
	),
});

const room = new Elysia().group('/room', room =>
	room
		.get(
			'/',
			({ set }) => {
				set.status = 200;
				return rooms;
			},
			{
				response: {
					200: t.Array(roomTType),
					400: t.String(),
				},
				beforeHandle: ({ set, request: { headers } }) => {
					if (!verifyAuthToken(headers)) {
						set.status = 401;
						return 'Unauthorized';
					}
				},
				detail: {
					summary: 'Get all rooms',
					tags: ['room'],
				},
			},
		)
		.get(
			'/:id',
			({ params: { id }, set }) => {
				const found = rooms.find(room => room.id === parseInt(id));

				if (found) {
					set.status = 200;
					return found;
				}

				set.status = 400;
				return `No items found with id ${id}`;
			},
			{
				response: {
					200: roomTType,
					400: t.String(),
				},
				beforeHandle: ({ set, request: { headers } }) => {
					if (!verifyAuthToken(headers)) {
						set.status = 401;
						return 'Unauthorized';
					}
				},
				detail: {
					summary: 'Get a room by id',
					tags: ['room'],
				},
			},
		)
		.delete(
			'/:id',
			({ params: { id }, set }) => {
				const elIndex = rooms.findIndex(room => room.id === parseInt(id));

				if (elIndex !== -1) {
					rooms.splice(elIndex, 1);
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
					summary: 'Delete a room by id',
					tags: ['room'],
				},
			},
		)
		.post(
			'/',
			({ body, set }) => {
				if (body && body.room) {
					rooms.push(body.room as RoomModel);
					set.status = 201;
					return body.room;
				}

				set.status = 400;
				return `Element must be valid.`;
			},
			{
				body: t.Object({
					room: roomTType,
				}),
				response: {
					201: roomTType,
					400: t.String(),
				},
				beforeHandle: ({ set, request: { headers } }) => {
					if (!verifyAuthToken(headers)) {
						set.status = 401;
						return 'Unauthorized';
					}
				},
				detail: {
					summary: 'Add a new room',
					tags: ['room'],
				},
			},
		)
		.put(
			'/:id',
			({ params: { id }, set, body }) => {
				const elIndex = rooms.findIndex(room => room.id === parseInt(id));

				if (elIndex) {
					rooms[elIndex] = { ...rooms[elIndex], ...(body.room as RoomModel) };
					set.status = 200;
					return rooms[elIndex];
				}

				set.status = 404;
				return `No items found with id ${id}.`;
			},
			{
				body: t.Object({
					room: roomTType,
				}),
				response: {
					200: roomTType,
					404: t.String(),
				},
				beforeHandle: ({ set, request: { headers } }) => {
					if (!verifyAuthToken(headers)) {
						set.status = 401;
						return 'Unauthorized';
					}
				},
				detail: {
					summary: 'Get a room by id',
					tags: ['room'],
				},
			},
		),
);

export default room;
