import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'default' | 'muted';
}

export default function Section({ children, className, id, background = 'default' }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-24',
        background === 'muted' && 'bg-muted/30',
        className
      )}
    >
      <div className="container mx-auto px-6">
        {children}
      </div>
    </section>
  );
}
