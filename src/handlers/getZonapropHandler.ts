import { DatasetContent, Dictionary } from 'crawlee';
import scrapper from '../scrapper/zonaprop/main';

const getZonapropHandler = async (SCRAPPER_URL:string):Promise<DatasetContent<Dictionary>> => {
    
    const dataset = await scrapper(SCRAPPER_URL)
    return dataset;
}

export default getZonapropHandler