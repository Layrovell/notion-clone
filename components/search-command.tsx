'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { File } from 'lucide-react';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import { useSearch } from '@/hooks/use-search';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

const SearchCommand: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const documents = useQuery(api.documents.getSearch);

  const [isMounted, setIsMounted] = useState(false);

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  useEffect(() => {
    // prevent hydration errors, wz dynamic dialog. meaning in server side it doesnt exist but in client - it magically appear
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (ev: KeyboardEvent) => {
      if (ev.key === 'k' && (ev.metaKey || ev.ctrlKey)) {
        ev.preventDefault();
        toggle();
      }
    };

    document.addEventListener('keydown', down);

    return () => {
      document.removeEventListener('keydown', down);
    };
  }, [toggle]);

  const onSelect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
    onClose();
  };

  if (!isMounted) {
    return null;
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user?.fullName}'s documents`} />

      <CommandList>
        <CommandEmpty>No documents found</CommandEmpty>

        <CommandGroup heading='Documents'>
          {documents?.map((doc) => {
            return (
              <CommandItem key={doc._id} value={`${doc._id}-${doc.title}`} title={doc.title} onSelect={onSelect}>
                {doc.icon ? <p className='mr-2 text-[18px]'>{doc.icon}</p> : <File className='mr-2 h-4 w-4' />}
                <span>{doc.title}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export { SearchCommand };
