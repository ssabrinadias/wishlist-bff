import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
}).on('error', (error) => {
  throw new Error('deu ruim');
});
