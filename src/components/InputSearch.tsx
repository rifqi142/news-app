import { MagnifyingGlass } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Button } from "./ui/button";

const InputSearch = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSearch = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    const keyword = searchRef.current?.value;

    if (!keyword || keyword.trim() === "") return;

    if (
      (event as React.KeyboardEvent<HTMLInputElement>)?.key === "Enter" ||
      event?.type === "click"
    ) {
      event.preventDefault();
      navigate(`/search/${keyword}`);

      if (searchRef.current) {
        searchRef.current.value = "";
      }
    }
  };
  return (
    <div className="relative">
      <input
        ref={searchRef}
        type="text"
        placeholder="Search News..."
        className="w-full p-2 rounded"
        onKeyDown={(event) => handleSearch(event)}
      />
      <Button
        className="absolute top-0 right-0 h-full"
        onClick={(event) => handleSearch(event)}
        variant="ghost"
      >
        <MagnifyingGlass />
      </Button>
    </div>
  );
};

export default InputSearch;
