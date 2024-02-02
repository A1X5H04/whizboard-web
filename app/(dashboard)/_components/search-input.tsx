"use client";

import { useEffect, useState, ChangeEvent } from "react";
import qs from "query-string";
import { useDebounce } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { MagnifyingGlass } from "@phosphor-icons/react";

function SearchInput() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const query = qs.stringifyUrl(
      {
        url: "/",
        query: { search: debouncedValue },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(query);
  }, [debouncedValue, router]);

  return (
    <div className="input h-10 input-bordered w-full max-w-md inline-flex items-center gap-x-3">
      <MagnifyingGlass size="20" />
      <input
        onChange={handleChange}
        value={value}
        type="text"
        className="w-full h-full bg-transparent focus:outline-none appearance-none text-sm"
        placeholder="Search Boards"
      />
    </div>
  );
}

export default SearchInput;
