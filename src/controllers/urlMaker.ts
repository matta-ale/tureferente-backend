export const urlMaker = (data: any) => {
  const baseURL: string = 'https://www.zonaprop.com.ar/';

  const {
    propertyType,
    contractType,
    neighborhood,
  }: {
    propertyType: string | undefined;
    contractType: string | undefined;
    neighborhood: string | undefined;
  } = data;

  let SCRAPPER_URL:string = baseURL
  let auxArray:string[]=[]

  if(propertyType) auxArray.push(propertyType) 
  if(contractType) auxArray.push(contractType) 
  if(neighborhood) auxArray.push(neighborhood) 

  SCRAPPER_URL += auxArray.join('-') + '.html' 

  return SCRAPPER_URL
};
