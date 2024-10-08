'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Search, Trash, Undo } from 'lucide-react';

import { useMutation, useQuery } from 'convex/react';
import { Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';

import { ConfirmModal } from '@/components/modals/confirm-modal';
import { Spinner } from '@/components/spinner';
import { Input } from '@/components/ui/input';

const TrashBox: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState('');

  const filteredDocuments = documents?.filter((doc) => doc.title.toLowerCase().includes(search.toLowerCase()));

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>, documentId: Id<'documents'>) => {
    ev.stopPropagation();

    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: 'Restoring...',
      success: 'Restored',
      error: 'Failed to restore',
    });
  };

  const onRemove = (documentId: Id<'documents'>) => {
    // ev.stopPropagation();

    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Deleted',
      error: 'Failed to delete document',
    });

    if (params.documentId === documentId) {
      router.push('/documents');
    }
  };

  if (documents === undefined) {
    return (
      <div className='h-full flex items-center justify-center p-4'>
        <Spinner size='lg' />
      </div>
    );
  }

  return (
    <div className='text-sm'>
      <div className='flex items-center gap-x-1 p-2'>
        <Search className='h-4 w-4' />
        <Input
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
          placeholder='Filter by page title...'
          className='h-7 px-2 focus-visible:ring-transparent bg-secondary'
        />
      </div>

      <div className='mt-2 px-1 pb-1'>
        <p className='hidden last:block text-xs text-center text-muted-foreground pb-2'>No documents found</p>

        {filteredDocuments?.map((document) => (
          <div
            key={document._id}
            role='button'
            onClick={() => onClick(document._id)}
            className='text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between'
          >
            <span className='truncate pl-2'>{document.title}</span>

            <div className='flex items-center'>
              <div
                onClick={(ev) => onRestore(ev, document._id)}
                role='button'
                className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
              >
                <Undo className='h-4 w-4 text-muted-foreground' />
              </div>

              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div
                  role='button'
                  className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                >
                  <Trash className='h-4 w-4 text-muted-foreground' />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { TrashBox };
