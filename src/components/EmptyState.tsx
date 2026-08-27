interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = "No data Found",
  description = "No data available",
}: EmptyStateProps) {
  return (
    <div className="py-10 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
