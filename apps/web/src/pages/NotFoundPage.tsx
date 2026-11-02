import { IconHome, IconArrowLeft } from '@tabler/icons-react';

export function NotFoundPage() {
  return (
    <main className="flex min-h-[500px] min-w-0 items-center justify-center p-10">
      <div className="max-w-[400px] text-center">
        <p className="text-[96px] font-medium leading-none text-[#1C5E9E]">404</p>
        <p className="mb-2 mt-2 text-xl font-medium">Page introuvable</p>
        <p className="mb-6 text-sm leading-relaxed text-[#79776F]">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex justify-center gap-2">
          <button
            type="button"
            className="flex h-9 items-center gap-1.5 rounded-md bg-[#378ADD] px-4 text-[13px] text-white"
          >
            <IconHome size={15} stroke={2} />
            Retour au dashboard
          </button>
          <button
            type="button"
            className="flex h-9 items-center gap-1.5 rounded-md border border-[#DFDDD4] bg-white px-4 text-[13px]"
          >
            <IconArrowLeft size={15} stroke={2} />
            Page précédente
          </button>
        </div>
      </div>
    </main>
  );
}