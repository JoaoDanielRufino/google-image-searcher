import { customsearch } from '@googleapis/customsearch';

interface SearchRequest {
  q: string;
  fileType?: string;
  width?: number;
  height?: number;
  start?: number;
}

interface SearchResponse {
  title: string;
  link: string;
  displayLink: string;
  fileFormat: string;
  width: number;
  height: number;
  byteSize: number;
}

interface BaseParams {
  auth: string;
  cx: string;
  searchType: string;
}

export class CustomSearch {
  private baseParams: BaseParams;

  constructor({ apiKey, cx }: { apiKey: string; cx: string }) {
    this.baseParams = {
      auth: apiKey,
      cx,
      searchType: 'image',
    };
  }

  public async Search(params: SearchRequest): Promise<SearchResponse[]> {
    const { data: apiResponse } = await customsearch('v1').cse.list({
      ...this.baseParams,
      ...params,
    });

    if (!apiResponse.items) {
      return [];
    }

    return apiResponse.items?.map((item) => ({
      title: item.title!,
      link: item.link!,
      displayLink: item.displayLink!,
      fileFormat: item.fileFormat!,
      width: item.image!.width!,
      height: item.image!.height!,
      byteSize: item.image!.byteSize!,
    }));
  }
}
