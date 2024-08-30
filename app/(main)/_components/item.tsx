'use client';

import { ChevronRight, ChevronsDown, LucideIcon } from 'lucide-react';
import { Id } from '@/convex/_generated/dataModel';

import { cn } from '@/lib/utils';

interface ItemProps {
  id?: Id<'documents'>;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick: () => void;
  icon: LucideIcon;
}

const Item: React.FC<ItemProps> = ({
  id,
  label,
  onClick,
  icon: Icon,
  documentIcon,
  active,
  expanded,
  onExpand,
  isSearch,
  level,
}) => {
  const ChevronIcon = expanded ? ChevronsDown : ChevronRight;

  return (
    <div
      onClick={onClick}
      role={'button'}
      style={{
        paddingLeft: level ? `{${level * 12 + 12}px}` : '12px',
      }}
      className={cn(
        'group min-h-[28px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium',
        active && 'bg-primary/5 text-primary'
      )}
    >
      {!!id && (
        <div
          onClick={() => {}}
          role={'button'}
          className='h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1'
        >
          <ChevronIcon className='w-4 h-4 shrink-0 text-muted-foreground/50' />
        </div>
      )}

      {documentIcon ? (
        <div className='shrink-0 mr-2 text-[18px]'>{documentIcon}</div>
      ) : (
        <Icon className='shrink-0 h-[18px] mr-2 text-muted-foreground' />
      )}

      <span className='truncate'>{label}</span>

      {isSearch && (
        <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
          <span className='text-xs'>⌘</span>K
        </kbd>
      )}
    </div>
  );
};

export { Item };
