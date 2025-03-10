import { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  return <div className="flex h-full flex-col items-center justify-center">{children}</div>;
};

export default layout;
