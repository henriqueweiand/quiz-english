interface TitleProps {
  value: string;
}

export const Title = ({ value }: TitleProps) => (
  <div className="mb-4 text-lg font-bold">{value}</div>
);
