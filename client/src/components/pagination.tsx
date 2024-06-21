import { MoveLeft, MoveRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  maximumPages: number | undefined;
  onClickPrevious: () => void;
  onClickNext: () => void;
}

export default function Pagination(props: PaginationProps) {
  const { currentPage, maximumPages, onClickPrevious, onClickNext } = props;

  // Function to handle click on previous page button
  function handleOnClickPreviousPage() {
    if (currentPage === 1) return; // Do nothing if already on the first page
    onClickPrevious();
  }

  // Function to handle click on next page button
  function handleOnClickNextPage() {
    if (currentPage === maximumPages) return; // Do nothing if already on the last page
    onClickNext();
  }

  return (
    <div className="mt-3 flex justify-center items-center gap-8">
      {/* Button for previous page */}
      <button
        className="border border-gray-300 p-2 rounded hover:border-blue-500 focus:outline-none"
        onClick={handleOnClickPreviousPage}
      >
        <MoveLeft className="h-4 w-4" strokeWidth={2} />
      </button>

      {/* Display current page and maximum pages */}
      <p color="gray" className="font-normal">
        Page <span className="text-blue-500">{currentPage}</span> of{" "}
        <span className="text-pink-500">{maximumPages}</span>
      </p>

      {/* Button for next page */}
      <button
        className="border border-gray-300 p-2 rounded hover:border-pink-500 focus:outline-none"
        onClick={handleOnClickNextPage}
      >
        <MoveRight className="h-4 w-4" strokeWidth={2} />
      </button>
    </div>
  );
}
