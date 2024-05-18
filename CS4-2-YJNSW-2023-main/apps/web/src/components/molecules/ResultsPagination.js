import { Pagination } from "nsw-ds-react";
import { useContext } from "react";
import { SearchContext } from "../../contexts/Search";
import { useLocation, useSearchParams } from "react-router-dom";

function ResultsPagination() {
  const state = useContext(SearchContext)[0];
  const pagination = state.results.meta?.pagination;
  const searchParams = useSearchParams()[0];
  const location = useLocation();

  function getContent() {
    const { page, pageCount } = pagination;

    return (
      <Pagination
        paginationItems={getPaginationItems()}
        active={page}
        backLink={getPreviousPageLink(page, pageCount)}
        nextLink={getNextPageLink(page, pageCount)}
      />
    );
  }

  function getPaginationItems() {
    const { pageCount } = pagination;
    const pages = Array.from(Array(pageCount).keys());

    return pages
      .map((page) => page + 1)
      .map((page) => {
        return { url: `${location.pathname}?${getQueryParamsForPage(page)}#${location.hash}` };
      });
  }

  function getPreviousPageLink(page, totalPages) {
    const previousPage = page === 1 ? totalPages : page - 1;
    return `${location.pathname}?${getQueryParamsForPage(previousPage)}#${location.hash}`;
  }

  function getNextPageLink(page, totalPages) {
    const previousPage = page === totalPages ? 1 : page + 1;
    return `${location.pathname}?${getQueryParamsForPage(previousPage)}#${location.hash}`;
  }

  function getQueryParamsForPage(page) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    return params.toString();
  }

  return pagination ? getContent() : null;
}

export default ResultsPagination;
