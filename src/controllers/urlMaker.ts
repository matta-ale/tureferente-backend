const bedroomFilter = (
  minBedrooms: string | undefined,
  maxBedrooms: string | undefined,
): string => {
  if (!minBedrooms && !maxBedrooms) return '';
  if (!maxBedrooms) return `-mas-de-${minBedrooms}-habitaciones`;
  if (!minBedrooms) return `-hasta-${maxBedrooms}-habitaciones`;
  return `-desde-${minBedrooms}-hasta-${maxBedrooms}-habitaciones`;
};

const bathroomFilter = (
  minBathrooms: string | undefined,
): string => {
  if (!minBathrooms) return '';
  return `-mas-de-${minBathrooms}-banos`;
};

export const urlMaker = (data: any) => {
  const baseURL: string = 'https://www.zonaprop.com.ar/';

  const {
    propertyType,
    contractType,
    neighborhood,
    minBedrooms,
    maxBedrooms,
    minBathrooms,
  }: {
    propertyType: string | undefined;
    contractType: string | undefined;
    neighborhood: string | undefined;
    minBedrooms: string | undefined;
    maxBedrooms: string | undefined;
    minBathrooms: string | undefined;
  } = data;

  let SCRAPPER_URL: string = baseURL;
  let auxArray: string[] = [];

  if (propertyType) auxArray.push(propertyType);
  if (contractType) auxArray.push(contractType);
  if (neighborhood) auxArray.push(neighborhood);

  SCRAPPER_URL +=
    auxArray.join('-') +bathroomFilter(minBathrooms) + bedroomFilter(minBedrooms, maxBedrooms) + '.html';

  return SCRAPPER_URL;
};
