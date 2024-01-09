interface ContentProps {
  description?: string | null;
}

export const Content = ({ description }: ContentProps) => {
  return <div dangerouslySetInnerHTML={{ __html: description || "" }}></div>;
};
