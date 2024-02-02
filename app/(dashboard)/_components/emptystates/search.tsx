import Image from "next/image";

function EmptyStateSearch() {
  return (
    <div className="grid place-items-center h-full">
      <div className="text-center flex flex-col items-center justify-center">
        <Image
          src="/emptysearch.svg"
          alt="Empty"
          width={175}
          height={175}
          className="mb-9"
        />
        <h2 className="text-2xl font-bold ">No Result Found!</h2>
        <p className="text-sm text-gray-500">
          Try searching for something else
        </p>
      </div>
    </div>
  );
}

export default EmptyStateSearch;
