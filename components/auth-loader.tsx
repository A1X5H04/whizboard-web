import Image from "next/image";

function AuthLoader() {
  return (
    <div className="grid place-items-center h-full">
      <div className="text-center flex flex-col items-center justify-center">
        <Image
          src="/logo-lg.png"
          alt="Logo"
          width={75}
          height={75}
          className="animate-bounce"
        />
        <div>
          <h2 className="text-3xl font-extrabold mt-8 text-primary">
            WhizBoard
          </h2>
          <p>A realtime collaboration platform!</p>
        </div>
      </div>
    </div>
  );
}

export default AuthLoader;
