export type linesTypes = {
  width?: string;
  height?: string;
  top?: string;
  right?: string;
  left?: string;
  color: string;
  angle: string;
};

export type blog = {
  id: number;
  image: string;
  topic: string;
  title: string;
  dateCreated: string;
  tags: string[]; // fun, enginerring, adventure, ...
  likes: number;
  comments: number;
  views: number;
};

export type blogsType = blog[];
