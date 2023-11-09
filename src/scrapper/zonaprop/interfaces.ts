export interface PropertyListing {
    titulo: string;
    location: string;
    moneda: string,
    precio: string;
    link: string|undefined;
    mTotales: string;
    mCubiertos: string;
    ambientes: number|string;
    dormitorios: number;
    banos: number;
    cocheras: number;
    status?: string
  }
  