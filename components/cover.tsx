'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ImageIcon, X } from 'lucide-react';

import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

import { useCoverImage } from '@/hooks/use-cover-image';
import { Button } from './ui/button';

import { useEdgeStore } from '@/lib/edgestore';
import { cn } from '@/lib/utils';

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

export const Cover = ({ url, preview }: CoverImageProps) => {
  const { edgestore } = useEdgeStore();

  const params = useParams();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    removeCoverImage({
      id: params.documentId as Id<'documents'>,
    });
  };

  return (
    <div className={cn('relative w-full h-[35vh] group', !url && 'h-[12vh]', url && 'bg-muted')}>
      {!!url && <Image src={url} alt='Cover image' className='object-cover' fill />}

      {url && !preview && (
        <div className='opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2'>
          <Button
            onClick={() => coverImage.onReplace(url)}
            variant='outline'
            size='sm'
            className='text-muted-foreground text-xs'
          >
            <ImageIcon className='h-4 w-4 mr-2' />
            Edit
          </Button>

          <Button
            onClick={onRemove}
            variant='outline'
            size='sm'
            className='text-muted-foreground text-xs'
          >
            <X className='h-4 w-4 mr-2' />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};
