import { Button } from "@/components/interface/Button";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { scrollToContainer } from "../utils";

export type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  scrollId: string;
};

export function Pagination({
  page,
  totalPages,
  onChange,
  scrollId,
}: PaginationProps) {
  const navigate = (p: number) => {
    onChange(p);
    requestAnimationFrame(() => scrollToContainer(scrollId));
  };

  return (
    <div className="flex gap-2 items-center">
      {/* Left arrow */}
      <Button
        className="max-w-12 h-9 rounded-l-full cursor-pointer"
        onClick={() => navigate(page - 1)}
        disabled={page === 1}
      >
        <FaAngleDoubleLeft className="size-8 bg-gray-800/80 border border-gray-400 text-white/30 hover:bg-gray-700/60 rounded-l-full" />
      </Button>

      {/* First page */}
      <Button
        className={"w-14 h-9"}
        intent={page == 1 ? "dark" : "primary"}
        size={"large"}
        onClick={() => navigate(1)}
      >
        1
      </Button>

      {/* Second page */}
      {page > 2 && page - 1 && (
        <Button
          className={"w-14 h-9"}
          intent={page == 2 ? "dark" : "primary"}
          size={"large"}
          onClick={() => navigate(page - 1)}
        >
          {page - 1}
        </Button>
      )}

      {/* Current page, only show if the current page is greather than one */}
      {page > 1 && page < totalPages && (
        <Button className={"w-14 h-9"} intent={"dark"} size={"large"}>
          {page}
        </Button>
      )}

      <p className="text-indigo-300 text-2xl">...</p>

      {/* Last Page */}
      {totalPages > 1 && (
        <Button
          className={"w-14 h-9"}
          intent={page === totalPages ? "dark" : "primary"}
          size={"large"}
          onClick={() => navigate(totalPages)}
        >
          {totalPages}
        </Button>
      )}
      {/* Right arrow */}
      <Button
        className="max-w-12 h-9 rounded-r-full cursor-pointer"
        onClick={() => navigate(page + 1)}
        disabled={page === totalPages}
      >
        <FaAngleDoubleRight className="size-8 bg-gray-800/80 border text-white/30 border-gray-400 hover:bg-gray-700/60 rounded-r-full" />
      </Button>
    </div>
  );
}
