'use client';

import { ElementRef, useRef, useState } from 'react';
import { ImageIcon, Smile, X } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';

import { useMutation } from 'convex/react';
import { Doc } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';

import { IconPicker } from '@/components/icon-picker';
import { Button } from '@/components/ui/button';
import { useCoverImage } from '@/hooks/use-cover-image';

interface ToolbarProps {
  initialData: Doc<'documents'>;
  preview?: boolean;
}

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  const inputRef = useRef<ElementRef<'textarea'>>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);

  const update = useMutation(api.documents.updateDocument);
  const removeIcon = useMutation(api.documents.removeIcon);

  const coverImage = useCoverImage();

  const enableInput = () => {
    if (preview) {
      return;
    }

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onInput = (val: string) => {
    setValue(val);
    update({
      id: initialData._id,
      title: val || 'Untitled',
    });
  };

  const onKeyDown = (ev: React.KeyboardEvent) => {
    if (ev.key === 'Enter') {
     ev.preventDefault();
     disableInput();
    }
  };

  const onSelectIcon = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  }

  const onRemoveIcon = () => {
    removeIcon({
      id: initialData._id,
    })
  }

  return (
    <div className='group relative'>
      {!!initialData.icon && !preview && (
        <div className='flex items-center gap-x-2 group/icon pt-6'>
          <IconPicker onChange={onSelectIcon}>
            <p className='text-6xl hover:opacity-75 transition'>{initialData.icon}</p>
          </IconPicker>

          <Button
            onClick={onRemoveIcon}
            variant='outline'
            size='icon'
            className='rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs'
          >
            <X className='h-4 w-4' />
          </Button>
        </div>
      )}

      {!!initialData.icon && preview && <p className='text-6xl pt-6'>{initialData.icon}</p>}

      <div className='opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4'>
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onSelectIcon}>
            <Button variant='outline' size='sm' className='text-xs text-muted-foreground'>
              <Smile className='h-4 w-4 mr-2' />
              Add icon
            </Button>
          </IconPicker>
        )}

        {!initialData.coverImage && !preview && (
          <Button
            onClick={coverImage.onOpen}
            variant='outline'
            size='sm'
            className='text-xs text-muted-foreground'
          >
            <ImageIcon className='h-4 w-4 mr-2' />
            Add cover
          </Button>
        )}
      </div>

      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(ev) => onInput(ev.target.value)}
          className='text-5xl bg-transparent font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf] resize-none'
        />
      ) : (
        <div
          onClick={enableInput}
          className='pb-3 text-5xl font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf]'
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
};
