export interface MetaData {
  title: string;
  description: string;
}

export const createMetaTags = ({ title, description }: MetaData): MetaData => ({
  title: `${title} | My App`,
  description
});