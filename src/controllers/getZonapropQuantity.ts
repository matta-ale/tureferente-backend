import { Request, Response } from 'express';
import getZonapropQuantityHandler from '../handlers/getZonapropQuantityHandler'
import { urlMaker } from './urlMaker';
import { DatasetContent, Dictionary } from 'crawlee';

const getZonapropQuantity = async (req:Request, res:Response) => {
    const data = req.query
    const SCRAPPER_URL:string = urlMaker(data)
    console.log(SCRAPPER_URL);
    
    const response:String = await getZonapropQuantityHandler(SCRAPPER_URL)
    console.log(response);
    
    const quantity:string = response.split(' ')[0]
    res.status(200).send(quantity);
};

export default getZonapropQuantity
