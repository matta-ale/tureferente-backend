import { DatasetContent, Dictionary } from 'crawlee';

const getMetrics = async (
  dataset: DatasetContent<Dictionary>,
  data: any
): Promise<{
  quantity: number;
  usdM2Avg: number;
  usdM2Max: number;
  usdM2Min: number;
}> => {
  let items: Dictionary[] = dataset.items.slice(0, -1); // Remove the last item
  items = items.filter(
    (item: Dictionary) =>
      item.moneda === 'USD' &&
      item.precio !== undefined &&
      item.precio > 100 &&
      item.mCubiertos > 0
  );

  const usdM2MaxLimit = data.usdM2MaxLimit;
  const usdM2MinLimit = data.usdM2MinLimit;

  const quantity: number = items.length;
  let usdM2Acum: number = 0;
  let usdM2Max: number = 0;
  let usdM2Min: number = 99999999999999;
  const groupedMetrics: any = {};

  items.forEach((item) => {
    //metricas generales
    let usdM2: number = item.precio / item.mCubiertos;

    if (usdM2 >= usdM2MinLimit && usdM2 <= usdM2MaxLimit) {  //si el usdM2 está entre valores lógicos, lo uso para las métricas, sino lo considero outlier
      usdM2Acum += usdM2;
      if (usdM2 > usdM2Max) usdM2Max = Math.round(usdM2);
      if (usdM2 < usdM2Min) usdM2Min = Math.round(usdM2);
      //metricas agrupadas

      let dormString = '';
      item.dormitorios === 1
        ? (dormString = ' dormitorio ')
        : (dormString = ' dormitorios ');
      let banoString = '';
      item.banos === 1 ? (banoString = ' baño ') : (banoString = ' baños ');
      let cocheraString = '';
      item.cocheras === 1
        ? (cocheraString = ' cochera')
        : (cocheraString = ' cocheras');

      let group: string =
        item.dormitorios.toString() +
        dormString +
        item.banos.toString() +
        banoString +
        item.cocheras.toString() +
        cocheraString;

      if (groupedMetrics.hasOwnProperty(group)) {
        groupedMetrics[group].usdM2Avg = Math.round(
          (groupedMetrics[group].usdM2Avg * groupedMetrics[group].quantity +
            usdM2) /
            (groupedMetrics[group].quantity + 1)
        );
        groupedMetrics[group].quantity += 1;
        if (usdM2 > groupedMetrics[group].usdM2Max)
          groupedMetrics[group].usdM2Max = Math.round(usdM2);
        if (usdM2 < groupedMetrics[group].usdM2Min)
          groupedMetrics[group].usdM2Min = Math.round(usdM2);
      } else {
        groupedMetrics[group] = {
          quantity: 1,
          usdM2Avg: Math.round(usdM2),
          usdM2Max: Math.round(usdM2),
          usdM2Min: Math.round(usdM2),
        };
      }
    }
  });
  let usdM2Avg: number = Math.round(usdM2Acum / quantity);

  const metrics: any = {
    generalMetrics: { quantity, usdM2Avg, usdM2Max, usdM2Min },
    groupedMetrics: groupedMetrics,
  };
  return metrics;
};

export default getMetrics;
