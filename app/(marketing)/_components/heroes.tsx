'use client';

import Image from 'next/image';

const Heroes: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center max-w-5xl'>
      <div className='flex items-center'>
        <div className='relative w-[240px] h-[240px] sm:w-[340px] sm:h-[340px] md:h-[400px] md:w-[400px]'>
          <Image src={'/documents.svg'} alt='Documents' fill className='object-contain dark:hidden' />
          <Image src={'/documents-dark.svg'} alt='Documents' fill className='object-contain hidden dark:block' />
        </div>

        <div className='relative w-[340px] h-[340px] hidden md:block'>
          <Image src={'/creative.svg'} alt='Creativity' fill className='object-contain dark:hidden' />
          <Image src={'/creative-dark.svg'} alt='Creativity' fill className='object-contain hidden dark:block' />
        </div>
      </div>
    </div>
  );
};

export { Heroes };
