import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Code with Emjay. Ready to run on Heroku.');
});
export = router;
