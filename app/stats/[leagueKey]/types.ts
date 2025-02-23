export type Teams = {
  [key: string]: { name: string; nickname: string; image: string };
};

export type Metric = {
  title: string;
  description: string;
  stats: { key: string; value: string }[];
};
