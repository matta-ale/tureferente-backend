import {Router, Request, Response} from 'express'
import getZonaprop from '../controllers/getZonaprop';

const router:Router = Router();

router.get('/hc',(req:Request,res:Response) => {  // healthcheck
    res.status(200).send('Server up')
})
router.get('/zonaprop',getZonaprop)

export default router