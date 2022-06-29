import axios from 'axios';

import { Item } from '../../interfaces';

interface SearchQueries {
  count: number;
  searchTherms: string;
  searchType: string;
  startIndex: number;
  title: string;
  totalResults: number;
}

export interface SearchResponse {
  request: SearchQueries;
  nextPage: SearchQueries;
  items: Item[];
}

export interface SearchRequest {
  q: string;
  fileType?: string;
  width?: number;
  height?: number;
  start?: number;
}

const search = async (request: SearchRequest): Promise<SearchResponse> => {
  const response = await axios.post<SearchResponse>(
    process.env.REACT_APP_API_ENDPOINT!,
    {
      apiKey: process.env.REACT_APP_API_KEY,
      cx: process.env.REACT_APP_CX,
      ...request,
    }
  );

  return response.data;
};

export default search;
