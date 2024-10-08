'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useMutation } from 'convex/react';
import { Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';

import { ConfirmModal } from '@/components/modals/confirm-modal';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  documentId: Id<'documents'>;
}

export const Banner = ({ documentId }: NavbarProps) => {
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: 'Removing document...',
      success: 'Document removed!',
      error: 'Failed to remove document',
    });

    router.push('/documents');
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: 'Restoring document...',
      success: 'Document restored!',
      error: 'Failed to restore document',
    });
  };

  return (
    <div className='w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center'>
      <p className=''>This page is in trash</p>

      <Button
        size={'sm'}
        onClick={onRestore}
        variant={'outline'}
        className='border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal'
      >
        Restore page
      </Button>

      <ConfirmModal onConfirm={onRemove}>
        <Button
          size={'sm'}
          variant={'outline'}
          className='border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal'
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};
