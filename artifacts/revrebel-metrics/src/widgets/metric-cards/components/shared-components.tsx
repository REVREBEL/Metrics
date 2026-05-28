
export const ChartHeader = ({ label, total }: { label: string, total: string }) => {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold text-dark-blue leading-none mb-1">
        {total}
      </h3 >
      <p className="text-sm text-dark-blue font-medium">{label}</p>
    </div>
  );
};