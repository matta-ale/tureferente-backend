import { Request, Response } from 'express';
import getZonapropHandler from '../handlers/getZonapropHandler'
import { urlMaker } from './urlMaker';
import { DatasetContent, Dictionary } from 'crawlee';

const getZonaprop = async (req:Request, res:Response) => {
    const data = req.query
    const SCRAPPER_URL:string = urlMaker(data)
    const response:DatasetContent<Dictionary> = await getZonapropHandler(SCRAPPER_URL)
    res.status(200).send(response);
};

export default getZonaprop
