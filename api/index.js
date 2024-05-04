import * as express from 'express';
import router from './routes/FailedBanks.js';
const app = express();
const port = 4000;

app.use('/FailedBanks', router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

