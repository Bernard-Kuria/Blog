export type linesTypes = {
  width?: string;
  height?: string;
  top?: string;
  right?: string;
  left?: string;
  color: string;
  angle: string;
};

export type blogContent = {
  id: string;
  topic: string;
  blog: {
    id: string;
    type: string;
    content: string;
    tableContent: null;
  };
};

export type blogContentType = blogContent[];

export type topic = {
  id: number;
  image: string;
  title: string;
  timeStamp: string;
};

export type BlogTopicsType = topic[];

export type Blog = {
  id: string;
  image: string;
  topic: string;
  title: string;
  subtitle: string;
  dateCreated: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
};

export type BlogsType = Blog[];

export type featuredBlog = {
  id: string;
  topic: string;
};

export type featuredBlogType = featuredBlog[];

export type draft = {
  id: string;
  image: string;
  topic: string;
  title: string;
  dateCreated: string;
  tags: string[];
};

export type draftsType = draft[];

export type comment = {
  id: string;
  comment: string;
  likes: number;
};

export type commentsType = comment[];

export type tag = {
  "life on wheels": {
    id: number;
    tagName: string;
  }[];
  "Startups & Ideas": {
    id: number;
    tagName: string;
  }[];
  "Projects & Tech": {
    id: number;
    tagName: string;
  };
};

export type tagsType = tag[];
