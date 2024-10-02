export interface MultimediaType {
  type: string;
  url: string;
}

export interface NewsType {
  abstract: string;
  web_url: string;
  load_paragraph: string;
  source: string;
  published_date: string;
  multimedia: MultimediaType[];
}
