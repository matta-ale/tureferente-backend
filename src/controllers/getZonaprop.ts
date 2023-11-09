import { Request, Response } from 'express';
import getZonapropHandler from '../handlers/getZonapropHandler'
import { urlMaker } from './urlMaker';

const getZonaprop = async (req:Request, res:Response) => {
    const data = req.query
    const SCRAPPER_URL:string = urlMaker(data)
    const response:any = await getZonapropHandler(SCRAPPER_URL,data)
    res.status(200).send(response);
};

export default getZonaprop
