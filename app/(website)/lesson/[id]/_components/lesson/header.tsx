import { ReactNode } from "react";

interface HeaderProps {
  data?: string;
  qtdQuestions?: number;
  description?: string | null | ReactNode;
  children: ReactNode;
}

export const Header = ({
  qtdQuestions,
  description,
  children,
}: HeaderProps) => {
  return (
    <section aria-labelledby="information-heading" className="mt-4">
      <h2 id="information-heading" className="sr-only">
        Product information
      </h2>

      <div className="flex items-center">
        {
          !!qtdQuestions && (
            <p className="text-sm text-gray-900 sm:text-xl border-r mr-4 pr-4">
              {qtdQuestions} Questions
            </p>
          )
        }

        <div className=" border-gray-300">
          <div className="flex items-center gap-2">{children}</div>
        </div>
      </div>

      <div className="mt-4 space-y-6">
        <p className="text-base text-gray-500">{description}</p>
      </div>
    </section>
  );
};
