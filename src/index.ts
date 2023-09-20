import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import routes from './routes';

const app = new Elysia()
	.use(
		swagger({
			documentation: {
				info: {
					title: 'Flutter Test API Documentation',
					version: '1.0.0',
				},
			},
		}),
	)
	.use(routes);

app.listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
