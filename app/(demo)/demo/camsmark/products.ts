export type Product = {
  id: string;
  name: string;
  sourceName: string;
  spec: string;
  price: string;
  image: string;
  url: string;
  benefit: string;
  hashtags: string;
};

// Catálogo público de Panamá consultado el 20 de noviembre de 2026.
// Datos estáticos: esta demo no consulta inventario ni publica en redes.
export const products: Product[] = [
  {
    "id": "TCZ-220 110V",
    "name": "Sirena electrónica TCZ-220",
    "sourceName": "SIRENAS TCZ-220 (ML20)ELECTRON 110V",
    "spec": "110 V · Modelo ML20",
    "price": "53.76",
    "image": "https://camsmark.com/storage/products/featured/sirenas-tcz-220-ml20electron-110v-02-05-6afdee8eb14e7.jpg",
    "url": "https://camsmark.com/pa/producto/sirenas-tcz-220-ml20electron-110v-02-05",
    "benefit": "Señalización sonora para tu instalación. Consulta su compatibilidad con tu proyecto.",
    "hashtags": "#CamsmarkLatam #MaterialElectrico #Panama #Automatizacion"
  },
  {
    "id": "EL-24",
    "name": "Aislador EL-24",
    "sourceName": "AISLADORES TIPO EL-24 24 KV h:210mm.",
    "spec": "24 kV · Altura 210 mm",
    "price": "35.80",
    "image": "https://camsmark.com/storage/products/featured/aisladores-tipo-el-24-24-kv-h210mm-01-06-a6728b4b-6afefc8cb1251.jpg",
    "url": "https://camsmark.com/pa/producto/aisladores-tipo-el-24-24-kv-h210mm-01-06-a6728b4b",
    "benefit": "Aislamiento eléctrico para tu proyecto de 24 kV. Revisa las especificaciones y elige con información.",
    "hashtags": "#CamsmarkLatam #MaterialElectrico #Panama #Aisladores"
  },
  {
    "id": "EL-15",
    "name": "Aislador EL-15",
    "sourceName": "AISLADORES TIPO EL-15 15 KV h:142mm.",
    "spec": "15 kV · Altura 142 mm",
    "price": "28.90",
    "image": "https://camsmark.com/storage/products/featured/aisladores-tipo-el-15-15-kv-h142mm-01-05-6afdefebe9938.jpg",
    "url": "https://camsmark.com/pa/producto/aisladores-tipo-el-15-15-kv-h142mm-01-05",
    "benefit": "Encuentra el aislador de 15 kV que requiere tu instalación, con sus medidas a la vista.",
    "hashtags": "#CamsmarkLatam #MaterialElectrico #Panama #Aisladores"
  },
  {
    "id": "EL-6M",
    "name": "Aislador EL-6M",
    "sourceName": "AISLADORES TIPO EL-6M  6 KV h: 90mm.",
    "spec": "6 kV · Altura 90 mm",
    "price": "18.35",
    "image": "https://camsmark.com/storage/products/featured/aisladores-tipo-el-6m-6-kv-h-90mm-01-04-6afdf045554ae.jpg",
    "url": "https://camsmark.com/pa/producto/aisladores-tipo-el-6m-6-kv-h-90mm-01-04",
    "benefit": "Una opción de aislamiento de 6 kV en formato de 90 mm de altura.",
    "hashtags": "#CamsmarkLatam #MaterialElectrico #Panama #Aisladores"
  },
  {
    "id": "SM-76",
    "name": "Aislador SM-76",
    "sourceName": "AISLADORES SM-76 h:76mm.  600 V",
    "spec": "600 V · Altura 76 mm",
    "price": "6.23",
    "image": "https://camsmark.com/storage/products/featured/aisladores-sm-76-h76mm-01-03-6afb0526d23ac.jpg",
    "url": "https://camsmark.com/pa/producto/aisladores-sm-76-h76mm-01-03",
    "benefit": "Completa tu montaje eléctrico con un aislador de 600 V y 76 mm de altura.",
    "hashtags": "#CamsmarkLatam #MaterialElectrico #Panama #Aisladores"
  },
  {
    "id": "SM-35",
    "name": "Aislador SM-35",
    "sourceName": "AISLADORES SM-35 h:35mm. 600 V",
    "spec": "600 V · Altura 35 mm",
    "price": "2.11",
    "image": "https://camsmark.com/storage/products/featured/aisladores-sm-35-h35mm-01-01-6afb05d41f686.jpg",
    "url": "https://camsmark.com/pa/producto/aisladores-sm-35-h35mm-01-01",
    "benefit": "Aislamiento de 600 V en un formato de 35 mm de altura para tu montaje.",
    "hashtags": "#CamsmarkLatam #MaterialElectrico #Panama #Aisladores"
  }
];

