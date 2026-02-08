import { App } from './app';

const PORT = parseInt(process.env.PORT as string) || 3001;
const app = new App();

app.listen(PORT);