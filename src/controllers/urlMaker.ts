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

  let scrapperURL:string = baseURL
  let auxArray:string[]=[]

  if(propertyType) auxArray.push(propertyType) 
  if(contractType) auxArray.push(contractType) 
  if(neighborhood) auxArray.push(neighborhood) 

  scrapperURL += auxArray.join('-') + '.html' 

  return scrapperURL
};
