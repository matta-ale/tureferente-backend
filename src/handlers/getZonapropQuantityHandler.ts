import { DatasetContent, Dictionary } from 'crawlee';
import {quantityScrapper} from '../scrapper/zonaprop/main';
import getMetrics  from './getMetrics';
import DataFrame from 'dataframe-js';

const getZonapropQuantityHandler = async (SCRAPPER_URL:string):Promise<String> => {
    
    const dataset:DatasetContent<Dictionary> = await quantityScrapper(SCRAPPER_URL)    
    return dataset.items[dataset.items.length-1].quantityText;
}

export default getZonapropQuantityHandler