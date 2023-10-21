import { Request, Response } from 'express';
import getZonapropHandler from '../handlers/getZonapropHandler'
import { urlMaker } from './urlMaker';

const getZonaprop = async (req:Request, res:Response) => {
    const data = req.query
    const scrapperURL:string = urlMaker(data)
    const stringResponse:string = await getZonapropHandler(scrapperURL)
    res.status(200).send(stringResponse);
};

export default getZonaprop
