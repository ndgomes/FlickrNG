import { MoveLeft, MoveRight } from "lucide-react";

interface PaginationProps {
  initialPage: number;
  maximumPages: number | undefined;
  onClickPrevious: () => void;
  onClickNext: () => void;
}

export default function Pagination(props: PaginationProps) {
  let active = props.initialPage;

  function handleOnClickPreviousPage() {
    if (active === 1) return;
    active -= 1;
    props.onClickPrevious();
  }

  function handleOnClickNextPage() {
    if (active === props.maximumPages) return;
    active += 1;
    props.onClickNext();
  }

  return (
    <div className="mt-3 flex justify-center items-center gap-8">
      <button
        className="border border-gray-300 p-2 rounded hover:border-blue-500 focus:outline-none disabled:opacity-50"
        onClick={handleOnClickPreviousPage}
        disabled={active === 1}
      >
        <MoveLeft className="h-4 w-4" strokeWidth={2} />
      </button>
      <p color="gray" className="font-normal">
        Page <span className="text-blue-500">{active}</span> of{" "}
        <span className="text-pink-500">{props.maximumPages}</span>
      </p>
      <button
        className="border border-gray-300 p-2 rounded hover:border-pink-500 focus:outline-none disabled:opacity-50"
        onClick={handleOnClickNextPage}
        disabled={active === 10}
      >
        <MoveRight className="h-4 w-4" strokeWidth={2} />
      </button>
    </div>
  );
}
