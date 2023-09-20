import Elysia, { t } from 'elysia';
import { verifyAuthToken } from '../utils/jwt';
import { cameras } from '../utils/mock';

const cameraTType = t.Object({
	id: t.Number(),
	status: t.String(),
});

const camera = new Elysia().group('/camera', camera =>
	camera
		.get(
			'/',
			({ set }) => {
				set.status = 200;
				return cameras;
			},
			{
				response: {
					200: t.Array(cameraTType),
					400: t.String(),
				},
				beforeHandle: ({ set, request: { headers } }) => {
					if (!verifyAuthToken(headers)) {
						set.status = 401;
						return 'Unauthorized';
					}
				},
				detail: {
					summary: 'Get all cameras',
					tags: ['camera'],
				},
			},
		)
		.get(
			'/:id',
			({ params: { id }, set }) => {
				const found = cameras.find(camera => camera.id === parseInt(id));

				if (found) {
					set.status = 200;
					return found;
				}

				set.status = 400;
				return `No items found with id ${id}`;
			},
			{
				response: {
					200: cameraTType,
					400: t.String(),
				},
				beforeHandle: ({ set, request: { headers } }) => {
					if (!verifyAuthToken(headers)) {
						set.status = 401;
						return 'Unauthorized';
					}
				},
				detail: {
					summary: 'Get a camera by id',
					tags: ['camera'],
				},
			},
		)
    .delete(
			'/:id',
			({ params: { id }, set }) => {
				const elIndex = cameras.findIndex(camera => camera.id === parseInt(id));

				if (elIndex !== -1) {
					cameras.splice(elIndex, 1);
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
					summary: 'Delete a camera by id',
					tags: ['camera'],
				},
			},
		)
		.post(
			'/',
			({ body, set }) => {
				if (body && body.camera) {
					cameras.push(body.camera as CameraModel);
					set.status = 201;
					return body.camera;
				}

				set.status = 400;
				return `Element must be valid.`;
			},
			{
				body: t.Object({
					camera: cameraTType,
				}),
				response: {
					201: cameraTType,
					400: t.String(),
				},
				beforeHandle: ({ set, request: { headers } }) => {
					if (!verifyAuthToken(headers)) {
						set.status = 401;
						return 'Unauthorized';
					}
				},
				detail: {
					summary: 'Add a new camera',
					tags: ['camera'],
				},
			},
		)
		.put(
			'/:id',
			({ params: { id }, set, body }) => {
				const elIndex = cameras.findIndex(camera => camera.id === parseInt(id));

				if (elIndex) {
					cameras[elIndex] = { ...cameras[elIndex], ...(body.camera as CameraModel) };
					set.status = 200;
					return cameras[elIndex];
				}

				set.status = 404;
				return `No items found with id ${id}.`;
			},
			{
				body: t.Object({
					camera: cameraTType,
				}),
				response: {
					200: cameraTType,
					404: t.String(),
				},
				beforeHandle: ({ set, request: { headers } }) => {
					if (!verifyAuthToken(headers)) {
						set.status = 401;
						return 'Unauthorized';
					}
				},
				detail: {
					summary: 'Get a camera by id',
					tags: ['camera'],
				},
			},
		),
);

export default camera;
