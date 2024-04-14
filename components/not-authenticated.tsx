import Image from "next/image";
import { useRouter } from "next/navigation";

function NotAuthenticated() {
  const router = useRouter();
  return (
    <div className="grid place-items-center h-full">
      <div className="text-center flex flex-col items-center justify-center">
        <Image
          src="/unauthenticated.svg"
          alt="Empty"
          width={175}
          height={175}
          className="mb-9"
        />
        <h2 className="text-2xl font-bold ">You are not authenticated!</h2>
        <p className="text-sm text-gray-500">
          Sign in or sign up to access this page!
        </p>

        <button
          onClick={() => router.push("/sign-in")}
          className="btn btn-primary mt-6"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default NotAuthenticated;
