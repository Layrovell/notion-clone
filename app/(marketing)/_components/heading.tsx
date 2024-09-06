'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useConvexAuth } from 'convex/react';
import { SignInButton } from '@clerk/clerk-react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/spinner';

const Heading: React.FC = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className='max-w-3xl space-y-4'>
      <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
        Organize Your World, Your Way. Welcome to <span className='underline'>ThinkFlow</span>
      </h1>
      <h3 className='text-base sm:text-xl md:text-2xl font-medium'>
        A seamless platform to capture, organize, and share your ideas—anytime, anywhere.
      </h3>

      {isLoading && (
        <div className='w-full flex items-center justify-center'>
          <Spinner size={'lg'} />
        </div>
      )}

      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href={'/documents'}>
            Enter ThinkFlow <ArrowRight className='h-4 w-4 ml-2' />
          </Link>
        </Button>
      )}

      {!isAuthenticated && !isLoading && (
        <SignInButton mode='modal'>
          <Button size={'lg'}>
            Get ThinkFlow free <ArrowRight className='h-4 w-4 ml-2' />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export { Heading };
