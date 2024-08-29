import { Navbar } from "./_components/navbar";

const MarketingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='h-full dark:bg-[#1f1f1f]'>
      <Navbar />
      <main className='h-full pt-40'>{children}</main>
    </div>
  );
};

export default MarketingLayout;
