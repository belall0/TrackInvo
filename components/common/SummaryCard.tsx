interface SummaryCardProps {
  title: string;
  value: number | string;
  Icon: React.ComponentType<{ className?: string }>;
}
const SummaryCard = ({ Icon, title, value }: SummaryCardProps) => {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {/* check if Icon is exist to prevent component crash */}
        {Icon && <Icon className="size-5 text-gray-700" />}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className={`truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>{value}</p>
    </div>
  );
};

export default SummaryCard;
