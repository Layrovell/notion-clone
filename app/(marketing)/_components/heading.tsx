'use client';

import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

const Heading: React.FC = () => {
  return (
    <div className='max-w-3xl space-y-4'>
      <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
      Organize Your World, Your Way. Welcome to{' '}
        <span className='underline'>ThinkFlow</span>
      </h1>
      <h3 className='text-base sm:text-xl md:text-2xl font-medium'>A seamless platform to capture, organize, and share your ideas—anytime, anywhere.</h3>
      <Button>
        Enter ThinkFlow <ArrowRight className='h-4 w-4 ml-2' />
      </Button>
    </div>
  );
};

export { Heading };
