import Image from "next/image";

function EmptyStateOrg() {
  return (
    <div className="grid place-items-center h-full">
      <div className="text-center flex flex-col items-center justify-center">
        <Image
          src="/emptyorg.svg"
          alt="Empty"
          width={175}
          height={175}
          className="mb-9"
        />
        <h2 className="text-2xl font-bold">Welcome to WhizBoard</h2>
        <p className="text-sm text-gray-500">
          Create an organization to get started
        </p>
        <button className="btn btn-primary mt-6">Create Organization</button>
      </div>
    </div>
  );
}

export default EmptyStateOrg;
