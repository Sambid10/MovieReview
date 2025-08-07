export type ApiReview = {
  content: string;
  author: string
};

export type ReviewApiResponse = {
  page: number;
  results: ApiReview[];
};