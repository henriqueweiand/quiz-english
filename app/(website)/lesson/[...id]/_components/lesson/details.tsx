interface DetailsProps {
  data?: string | null;
}

export const Details = ({ data }: DetailsProps) => {
  if (!data) return <></>;

  return (
    <section aria-labelledby="details-heading">
      <div className="flex flex-col items-center">
        <h2
          id="details-heading"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Explanation
        </h2>
        <article
          className="prose dark:prose-invert prose-headings:text-indigo-400 mt-3 max-w-3xl text-lg tracking-[-0.003em] leading-[30px]"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </div>
    </section>
  );
};
