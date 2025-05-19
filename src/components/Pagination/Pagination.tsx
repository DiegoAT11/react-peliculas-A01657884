interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const maxVisiblePages = 5;
    const startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
    const visiblePages = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
    );

    return (
        <div className="flex flex-wrap gap-2 justify-center pb-3 pt-3">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="min-w-9 rounded-md py-2 px-3 text-center text-sm transition-all duration-300 shadow-md ml-2 
                text-black hover:text-white hover:bg-black cursor-pointer 
                disabled:bg-white disabled:text-slate-400 disabled:border-white disabled:cursor-not-allowed">
                Prev
            </button>

            {visiblePages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`min-w-9 rounded-md py-2 px-3 text-center text-sm transition-none shadow-md ml-2 cursor-pointer ${currentPage === page
                        ? "bg-black text-white"
                        : "text-black hover:text-white hover:bg-black"
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="min-w-9 rounded-md py-2 px-3 text-center text-sm transition-all duration-300 shadow-md ml-2 
                text-black hover:text-white hover:bg-black cursor-pointer
                disabled:bg-white disabled:text-slate-400 disabled:border-white disabled:cursor-not-allowed">
                Next
            </button>
        </div>
    );
};

export default Pagination;