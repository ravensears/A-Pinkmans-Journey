import express from 'express';
const router = express.Router();

const app = express();

router.get('/', (req, res) => res.render('welcome'));

export default router;