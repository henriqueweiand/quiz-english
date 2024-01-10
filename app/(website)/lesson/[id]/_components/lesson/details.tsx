interface DetailsProps {
  data?: string | null;
}

export const Details = ({ data }: DetailsProps) => {
  return (
    <section aria-labelledby="details-heading">
      <div className="flex flex-col items-center">
        <h2
          id="details-heading"
          className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          Explanation
        </h2>
        <p className="mt-3 max-w-3xl text-lg text-gray-600">{data}</p>
      </div>
    </section>
  );
};
