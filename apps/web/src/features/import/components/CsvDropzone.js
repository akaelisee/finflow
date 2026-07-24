import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { cn } from '@/shared/lib/cn';
export function CsvDropzone({ onFileSelected }) {
    const inputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files[0];
        if (file)
            onFileSelected(file);
    };
    return (_jsxs("div", { onDragOver: (event) => {
            event.preventDefault();
            setIsDragging(true);
        }, onDragLeave: () => setIsDragging(false), onDrop: handleDrop, onClick: () => inputRef.current?.click(), role: "button", tabIndex: 0, className: cn('flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-10 text-center transition-colors', isDragging ? 'border-brand-500 bg-brand-50' : 'border-gray-300'), children: [_jsx("p", { className: "font-medium text-gray-700", children: "Glissez-d\u00E9posez un fichier CSV ici" }), _jsx("p", { className: "text-sm text-gray-400", children: "ou cliquez pour parcourir vos fichiers" }), _jsx("input", { ref: inputRef, type: "file", accept: ".csv", className: "hidden", onChange: (event) => {
                    const file = event.target.files?.[0];
                    if (file)
                        onFileSelected(file);
                } })] }));
}
