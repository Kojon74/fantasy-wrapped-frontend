export type Data = {
  rank: number;
  image_url: string;
  main_text: string;
  sub_text?: string;
  stat?: string;
};

export type Metric = {
  title: string;
  description: string;
  type: string; // TODO: Make enum
  headers?: string[];
  data: Data[] | string[][];
};
