import { DatasetContent, Dictionary } from 'crawlee';
import {scrapper} from '../scrapper/zonaprop/main';
import getMetrics  from './getMetrics';
import DataFrame from 'dataframe-js';

const getZonapropHandler = async (SCRAPPER_URL:string, data:Object):Promise<DataFrame> => {
    
    const dataset:DatasetContent<Dictionary> = await scrapper(SCRAPPER_URL)
    const metrics:any = await getMetrics(dataset,data)
    console.log(metrics);
    return metrics;
}

export default getZonapropHandler