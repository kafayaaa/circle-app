import {
  clearResults,
  fetchAllUsers,
  fetchSearch,
  setTyping,
} from "@/redux/slices/searchSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    dispatch(clearResults()); // kosongkan list dulu
  }, [keyword, dispatch]);

  useEffect(() => {
    if (debouncedKeyword === "") {
      dispatch(fetchAllUsers());
      return;
    }

    dispatch(fetchSearch(debouncedKeyword));
  }, [debouncedKeyword, dispatch]);

  const isTyping = keyword !== debouncedKeyword;

  useEffect(() => {
    dispatch(setTyping(isTyping));
  }, [isTyping, dispatch]);

  return (
    <div className="w-full flex flex-col gap-2 p-3">
      <input
        type="text"
        className="w-full px-5 py-3 text-white bg-neutral-700 focus:bg-neutral-800 caret-white focus:outline-2 focus:outline-[#04a51e] rounded-full transition-all duration-300 ease-out"
        placeholder="Search..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  );
}
