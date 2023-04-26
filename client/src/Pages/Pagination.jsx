const Pagination = ({ decrementingPage, incrementPage, pageNumber, maxPage }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {pageNumber > 1 && <button
        id="prevPage"
        onClick={decrementingPage}
        style={{ fontSize: "20px" }}
      >
        &laquo;
      </button>}
      <h2 style={{ marginRight: "12px"}}>{pageNumber}</h2>
      {pageNumber < maxPage && <button id="nextPage" onClick={incrementPage} style={{ fontSize: "20px" }}>
        &raquo;
      </button>}
    </div>
  );
};

export default Pagination;