
export const CardHeaderData = ({ value, change, label }: { value: string, change: string, label: string }) => {
  const isNegative = change.startsWith('-');
  
  return (
    <div className="mb-4">
      <div className="flex items-baseline gap-2">
        <h3 className="text-xl font-bold text-dark-blue">{value}</h3>
        {/* If the change is negative, it uses gray. If positive, it uses blue. */}
        <span className={`text-[10px] font-bold ${isNegative ? 'text-negative' : 'text-positive'}`}>
          {change}
        </span>
      </div>
      <p className="text-xs  text-dark-blue font-displayfont-semibold uppercase tracking-wider">{label}</p>
    </div>
  );
};