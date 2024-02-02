import Image from "next/image";

function EmptyStateFavourite() {
  return (
    <div className="grid place-items-center h-full">
      <div className="text-center flex flex-col items-center justify-center">
        <Image
          src="/emptyfavourite.svg"
          alt="Empty"
          width={175}
          height={175}
          className="mb-9"
        />
        <h2 className="text-2xl font-bold ">No Favourite Yet</h2>
        <p className="text-sm text-gray-500">
          Favourite your boards to see them here
        </p>
      </div>
    </div>
  );
}

export default EmptyStateFavourite;
