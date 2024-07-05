import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div className="loading">
      <ReactLoading type={"bubbles"} color={"black"} height={100} width={80} />
    </div>
  );
}