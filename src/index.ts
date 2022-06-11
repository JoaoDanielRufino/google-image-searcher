import * as dotenv from 'dotenv';
import { CustomSearch } from './CustomSearch';

dotenv.config();

async function main() {
  const customSearch = new CustomSearch({
    apiKey: process.env.CUSTOM_SEARCH_API!,
    cx: process.env.SEARCH_ENGINE_CX!,
  });

  const response = await customSearch.Search({
    q: 'wallpaper 4k dark souls',
    fileType: 'webp',
  });

  console.log(response);
}

main();
