import Loading from "../Loading/Loading.jsx";

const DataLoader = ({
  loading,
  error,
  data,
  emptyMessage = "No data found",
  children,
}) => {
  if (loading && (!data || data.length === 0)) {
    return <Loading />;
  }

  if (error) {
    return <div className="error-alert">{error}</div>;
  }

  if (!data || data.length === 0) {
    return <p className="text-center text-muted">{emptyMessage}</p>;
  }

  return children;
};

export default DataLoader;
