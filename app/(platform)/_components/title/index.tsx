interface TitleProps {
  value: string;
}

export const Title = ({ value }: TitleProps) => (
  <h3 className="mb-4 text-lg font-bold">{value}</h3>
);
