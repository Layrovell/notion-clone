'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

import { useCoverImage } from '@/hooks/use-cover-image';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { SingleImageDropzone } from '@/components/single-image-dropzone';

import { useEdgeStore } from '@/lib/edgestore';
import { Id } from '@/convex/_generated/dataModel';

export const CoverImageModal = () => {
  const params = useParams();
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();

  const update = useMutation(api.documents.updateDocument);

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url,
        },
      });

      await update({
        id: params.documentId as Id<'documents'>,
        coverImage: res.url,
      });

      onClose();
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h1 className='text-center text-lg font-semibold'>Cover image</h1>
        </DialogHeader>

        <div>
          <SingleImageDropzone
            disabled={isSubmitting}
            value={file}
            onChange={onChange}
            className='w-full outline-none'
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
