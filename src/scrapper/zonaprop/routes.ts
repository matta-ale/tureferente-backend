import { createCheerioRouter, Dataset} from 'crawlee';

const labels = {
  START: 'START',
  PAGES: 'PAGES',
  OFFERS: 'OFFERS',
}

import { PropertyListing } from './interfaces';

export const router = createCheerioRouter();

router.addDefaultHandler(({ log }) => {
  log.info('Route reached');
});

router.addHandler(labels.PAGES, async ({$}) => {
  const nextPageLink = $('a[data-qa="PAGING_NEXT"]').attr('href');
  
  const propertyArray = []
  const products = $('div > div[data-to-posting]:not([data-to-posting=""])'); //this line of code selects all the <div> elements that are direct children of another <div>, have a "data-qa" attribute, and the "data-qa" attribute is not empty.

  for (const product of products) {
    const element = $(product);

    const link = element.attr('data-to-posting');
    const precio = element
      .find('div[data-qa="POSTING_CARD_PRICE"]')
      .text()
      .trim();
    const titulo = element
      .find('div[class="sc-ge2uzh-0 eXwAuU"]')
      .text()
      .trim();
    const location = element
      .find('div[data-qa="POSTING_CARD_LOCATION"]')
      .text()
      .trim();
    const featuresDiv = element.find('div[data-qa="POSTING_CARD_FEATURES"]');

    const features = featuresDiv.find('span > span');
    const featuresArray:string[] = [];
    features.each(() => {
      featuresArray.push($(this).text().trim());
    });
    let mTotales = '-';
    let mCubiertos = '-';

    if (featuresArray[0]) mTotales = featuresArray[0].split(' ')[0];
    if (featuresArray[1]) mCubiertos = featuresArray[0].split(' ')[0];
    let ambientes:number|string|undefined = featuresArray.find((text) => text.includes('amb'));
    let dormitorios:number|string|undefined = featuresArray.find((text) => text.includes('dorm'));
    let banos:number|string|undefined = featuresArray.find((text) => text.includes('baño'));
    let cocheras:number|string|undefined = featuresArray.find((text) => text.includes('coch'));
    
    ambientes
      ? (ambientes = Number(ambientes.split(' ')[0]))
      : (ambientes = '-');
    dormitorios
      ? (dormitorios = Number(dormitorios.split(' ')[0]))
      : (dormitorios = 0);
    banos ? (banos = Number(banos.split(' ')[0])) : (banos = 0);
    cocheras ? (cocheras = Number(cocheras.split(' ')[0])) : (cocheras = 0);

    let propertyObj:PropertyListing = {
      titulo,
      location,
      precio,
      link,
      mTotales,
      mCubiertos,
      ambientes,
      dormitorios,
      banos,
      cocheras,
    };
    if(nextPageLink) propertyObj.status = 'running'
    propertyArray.push(propertyObj)
    
  }
  await Dataset.pushData(propertyArray);


if (!nextPageLink) {
  await Dataset.pushData({status:'finished'});
} 
});

