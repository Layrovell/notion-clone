'use client';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className='h-full dark:bg-[#1f1f1f]'>
      {children}
    </div>
  );
};

export default MainLayout;
