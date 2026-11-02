import { IconTrash } from "@tabler/icons-react";

type Props = {
  open: boolean;
  onOpen: (value: boolean) => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
};

export function AlertDrop({
  open,
  onOpen,
  onConfirm,
  title = 'Supprimer cet élément',
  message = 'Cette action est irréversible. Êtes-vous sûr ?',
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-500/75 z-50">
      <div className="h-full flex items-center justify-center mx-auto ml-20 lg:ml-72">
        <div className="bg-white rounded-lg max-w-md">
          <div className="flex justify-center text-center pt-6 ">
            <div className="bg-red-200 p-2 rounded-full">
              <svg
                className="h-6 w-6 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>

          </div>
          <div className="pt-4 px-4 text-center">
            <h3 className="text-lg font-medium">{title}</h3>
          </div>
          <div className="mt-0 px-4 py-1 mb-6 sm:ml-4">
            <p className="text-sm text-gray-500">{message}</p>
          </div>
          <div className="flex flex-col gap-2 rounded-b-lg bg-gray-200 px-4 py-3 sm:justify-between sm:gap-3 sm:flex-row-reverse sm:px-6">
            <button
              onClick={onConfirm}
              type="button"
              className="inline-flex items-center gap-1 w-full rounded-md px-4 py-2 bg-red-800 text-white  hover:bg-red-700"
            >
              <IconTrash size={20} />
              Supprimer
            </button>
            <button
              onClick={() => onOpen(false)}
              type="button"
              className="w-full rounded-md border border-gray-300 px-4 py-2 bg-white  text-gray-700 hover:bg-gray-50 "
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}