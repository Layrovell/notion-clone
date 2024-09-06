'use client'; // every error component should be client side rendered

import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

const Error = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center space-y-6 p-8'>
      <Image
        src='/error.svg'
        width={300}
        height={300}
        alt='Error image'
        className='dark:hidden'
      />
      <Image
        src='/error-dark.svg'
        width={300}
        height={300}
        alt='Error image'
        className='hidden dark:block'
      />

      <h2 className='text-xl font-medium text-center'>
        Something went wrong. Please try again later.
      </h2>

      <Button asChild>
        <Link href='/documents'>Go back</Link>
      </Button>
    </div>
  );
};

export default Error;
