import { LuHandCoins } from 'react-icons/lu';

const Logo = () => {
  return (
    <div className="flex items-center">
      <LuHandCoins className="mr-4 h-12 w-12 rotate-[15deg]" />
      <p className="text-5xl font-bold">Invo</p>
    </div>
  );
};

export default Logo;
