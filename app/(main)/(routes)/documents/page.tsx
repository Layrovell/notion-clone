'use client';

import Image from 'next/image';
import { useUser } from '@clerk/clerk-react';
import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

const DocumentsPage: React.FC = () => {
  const { user } = useUser();
  console.log(user);

  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image src='/empty.svg' height={300} width={300} alt='Empty' className='dark:hidden' />
      <Image src='/empty-dark.svg' height={300} width={300} alt='Empty' className='hidden dark:block' />

      <h2 className='text-lg font-medium'>Welcome to {user?.fullName}&apos;s documents page!</h2>

      <Button>
        <PlusCircle className='h-4 w-4 mr-2' />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
