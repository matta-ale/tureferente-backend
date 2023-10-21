import { Request, Response } from 'express';
import getZonapropsHandler from '../handlers/getZonapropsHandler'

const getZonaprops = async (req:Request, res:Response) => {
    const stringResponse:string = getZonapropsHandler()
    res.status(200).send(stringResponse);
};

export default getZonaprops
