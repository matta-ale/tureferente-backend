import { Request, Response } from 'express';
import getZonapropQuantityHandler from '../handlers/getZonapropQuantityHandler'
import { urlMaker } from './urlMaker';

const getZonapropQuantity = async (req:Request, res:Response) => {
    const data = req.query
    console.log(data);
    
    const SCRAPPER_URL:string = urlMaker(data)
    const response:String = await getZonapropQuantityHandler(SCRAPPER_URL)
    let quantity:string = response.split(' ')[0]
    quantity = quantity.split('.').join('')
    res.status(200).send(quantity);
};

export default getZonapropQuantity
