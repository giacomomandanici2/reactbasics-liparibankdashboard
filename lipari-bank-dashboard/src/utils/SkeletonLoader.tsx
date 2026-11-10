export default function SkeletonLoader() {
  return (
    <div className="card skeleton">
      <div className="skeleton-line" style={{ width: "60%" }} />
      <div className="skeleton-line" style={{ width: "40%" }} />
      <div className="skeleton-line" style={{ width: "80%" }} />
    </div>
  );
}
