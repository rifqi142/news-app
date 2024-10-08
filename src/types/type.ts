export interface MultimediaType {
  type: string;
  url: string;
}

export interface HeadlineType<type> {
  main: type;
}

export interface BylineType {
  original: string;
}

export interface AllNewsType {
  title: string;
  abstract: string;
  url: string;
  load_paragraph: string;
  source: string;
  published_date: string;
  multimedia: MultimediaType[];
  byline: string;
  section: string;
  num_results: number;
}

export interface SearchNewsType {
  headline: HeadlineType<string>;
  abstract: string;
  web_url: string;
  load_paragraph: string;
  source: string;
  pub_date: string;
  section_name: string;
  byline: BylineType;
  multimedia: MultimediaType[];
}

export interface SavedArticleType {
  _id: string;
  isSaved: boolean;
}

export interface NewsPaginationProps {
  page: number;
  handlePageChange: (type: number) => void;
  totalPages: number;
}
