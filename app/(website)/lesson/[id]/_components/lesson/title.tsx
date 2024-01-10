interface TitleProps {
  data?: string;
}

export const Title = ({ data }: TitleProps) => {
  return (
    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      {data}
    </h1>
  );
};
