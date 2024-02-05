import Image from "next/image";

function AuthLoader() {
  return (
    <div className="grid place-items-center h-full">
      <div className="text-center flex flex-col items-center justify-center">
        <Image
          src="/logo-lg.png"
          alt="Logo"
          width={100}
          height={100}
          className="animate-bounce"
        />
      </div>
    </div>
  );
}

export default AuthLoader;
