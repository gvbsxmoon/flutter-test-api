import Elysia from 'elysia';

import login from './login';
import session from './session';
import camera from './camera';
import room from './room';

export default new Elysia().use(login).use(session).use(camera).use(room);
