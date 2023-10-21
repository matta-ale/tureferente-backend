import {Router, Request, Response} from 'express'
import getZonaprops from '../controllers/getZonaprops';

const router:Router = Router();

router.get('/hc',(req:Request,res:Response) => {  // healthcheck
    res.status(200).send('Server up')
})
router.get('/zonaprops',getZonaprops)

export default router