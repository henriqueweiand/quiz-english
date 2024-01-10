export const Nav = () => {
  return (
    <nav aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2">
        <li>
          <div className="flex items-center text-sm">
            <a
              href={"/"}
              className="font-medium text-gray-500 hover:text-gray-900"
            >
              Return to the list
            </a>
          </div>
        </li>
      </ol>
    </nav>
  );
};
