import { httpApi } from './http';
import { mockApi } from './mock';

export const isDemo = process.env.REACT_APP_DEMO === 'true';

export const api = isDemo ? mockApi : httpApi;
