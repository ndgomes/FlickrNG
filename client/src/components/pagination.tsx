import { MoveLeft, MoveRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  maximumPages: number | undefined;
  onClickPrevious: () => void;
  onClickNext: () => void;
}

export default function Pagination(props: PaginationProps) {
  const { currentPage, maximumPages, onClickPrevious, onClickNext } = props;

  function handleOnClickPreviousPage() {
    if (currentPage === 1) return;
    onClickPrevious();
  }

  function handleOnClickNextPage() {
    if (currentPage === maximumPages) return;
    onClickNext();
  }

  return (
    <div className="mt-3 flex justify-center items-center gap-8">
      <button
        className="border border-gray-300 p-2 rounded hover:border-blue-500 focus:outline-none"
        onClick={handleOnClickPreviousPage}
      >
        <MoveLeft className="h-4 w-4" strokeWidth={2} />
      </button>
      <p color="gray" className="font-normal">
        Page <span className="text-blue-500">{currentPage}</span> of{" "}
        <span className="text-pink-500">{maximumPages}</span>
      </p>
      <button
        className="border border-gray-300 p-2 rounded hover:border-pink-500 focus:outline-none"
        onClick={handleOnClickNextPage}
      >
        <MoveRight className="h-4 w-4" strokeWidth={2} />
      </button>
    </div>
  );
}
