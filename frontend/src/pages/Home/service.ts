import axios from 'axios';

interface SearchRequest {
  q: string;
  fileType?: string;
  width?: number;
  height?: number;
}

interface SearchQueries {
  count: number;
  searchTherms: string;
  searchType: string;
  startIndex: number;
  title: string;
  totalResults: number;
}

interface Items {
  displayLink: string;
  fileFormat: string;
  htmlSnippet: string;
  htmlTitle: string;
  image: {
    byteSize: number;
    contextLink: string;
    height: number;
    thumbnailHeight: number;
    thumbnailLink: string;
    thumbnailWidth: number;
    width: number;
  };
  kind: string;
  link: string;
  mime: string;
  snippet: string;
  title: string;
}

interface SearchResponse {
  request: SearchQueries;
  nextPage: SearchQueries;
  items: Items[];
}

const search = async (request: SearchRequest): Promise<SearchResponse> => {
  const response = await axios.post<SearchResponse>(
    process.env.REACT_APP_API_ENDPOINT!,
    {
      apiKey: process.env.REACT_APP_API_KEY,
      cx: process.env.REACT_APP_CX,
      q: request.q,
    }
  );

  return response.data;
};

export { search };
