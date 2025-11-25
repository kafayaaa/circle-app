import ProfileList from "@/components/ProfileList";
import SearchBar from "@/components/SearchBar";
import MainLayout from "@/layouts/Main";
import { fetchMyFollowers } from "@/redux/slices/followSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import type { User } from "@/redux/types/userType";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SearchPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { results, loading, keyword, isTyping } = useSelector(
    (state: RootState) => state.search
  );

  useEffect(() => {
    dispatch(fetchMyFollowers());
  }, [dispatch]);
  return (
    <MainLayout>
      <div className="w-full px-5 py-10 flex flex-col">
        <SearchBar />
        {!loading && results.length === 0 && keyword !== "" && (
          <p className="mt-10 text-xl text-white font-medium text-center">
            No results found.
          </p>
        )}
        {isTyping ? (
          <p className="mt-10 text-xl text-white font-medium text-center">
            Searching...
          </p>
        ) : (
          <div className="w-full flex flex-col">
            {results.map((item: User) => (
              <ProfileList
                key={item.id}
                id={item.id}
                photo_profile={item.photo_profile ?? ""}
                full_name={item.full_name}
                username={item.username}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
