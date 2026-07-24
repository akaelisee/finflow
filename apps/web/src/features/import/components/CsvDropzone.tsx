import { useRef, useState } from 'react';
import type { DragEvent } from 'react';
import { cn } from '@/shared/lib/cn';

interface CsvDropzoneProps {
  onFileSelected: (file: File) => void;
}

export function CsvDropzone({ onFileSelected }: CsvDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) onFileSelected(file);
  };

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-10 text-center transition-colors',
        isDragging ? 'border-brand-500 bg-brand-50' : 'border-gray-300',
      )}
    >
      <p className="font-medium text-gray-700">Glissez-déposez un fichier CSV ici</p>
      <p className="text-sm text-gray-400">ou cliquez pour parcourir vos fichiers</p>
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onFileSelected(file);
        }}
      />
    </div>
  );
}
