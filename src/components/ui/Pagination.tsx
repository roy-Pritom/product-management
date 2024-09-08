import { Button } from "@nextui-org/react";

const Pagination = ({ totalPosts, postPerPage, currentPage, setCurrentPage }: {
    totalPosts: number; postPerPage: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}) => {
    const pages = [];
    for (let index = 1; index <= Math.ceil(totalPosts / postPerPage); index++) {
        pages.push(index)

    }
    return (
        <div>
            {
                pages?.map((page, index) => {
                    return <Button  onClick={() => setCurrentPage(page)} className={`btn btn-sm ml-2 ${page == currentPage ? 'bg-green-400' : 'bg-slate-300 text-white '}`} key={index}>{page}</Button>
                })
            }
        </div>
    );
};

export default Pagination;