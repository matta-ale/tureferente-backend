// For more information, see https://crawlee.dev/
import { CheerioCrawler, Dataset} from 'crawlee';
import { router } from './routes';
import { jsonReader } from './jsonReader';

export default async function scrapper(SCRAPPER_URL:string) {

interface PropertyListing {
  titulo: string;
  location: string;
  precio: string;
  link: string;
  mTotales: string;
  mCubiertos: string;
  ambientes: number;
  dormitorios: number;
  banos: number;
  cocheras: number;
  status?: string
}

const labels = {
    START: 'START',
    PAGES: 'PAGES',
    OFFERS: 'OFFERS',
}

const crawler = new CheerioCrawler({
  requestHandler: router,
});

  let page:number = 1;
  let status = 'running';

  while (status !== 'finished') {
    await crawler.run([
      {
        url: `${SCRAPPER_URL}-pagina-${page}.html`,
        label: labels.PAGES,
      },
    ]);

    try {
      const jsonData:PropertyListing = await new Promise((resolve, reject) => {
        jsonReader((err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
      
      if (jsonData && jsonData.status) {
        status = jsonData.status;
      } else {
        console.log('No status data in JSON');
        status = 'finished'; // Set status to finished if data is missing
      }
    } catch (error) {
      console.log(error);
    }
    page += 1;
  }
  const dataset = await Dataset.getData()
  return dataset
}

