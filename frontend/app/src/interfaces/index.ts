export interface Item {
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
