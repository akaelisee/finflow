import { useEffect, useState } from 'react';
import { IconX,IconBuildingBank, IconPigMoney, IconCreditCard } from '@tabler/icons-react';
import type { Accounts, AccountType, CreateAccountInput, UpdateAccountInput } from '../types/accounts.types';


type Props = {
  open: boolean;
  onClose: () => void;
  onCreate?: (payload: CreateAccountInput) => Promise<unknown> | void
  onUpdate?: (id: string, payload: UpdateAccountInput) => Promise<unknown> | void
  accountToEdit?: Accounts | null
};

export function AccountForm({ open, onClose, onCreate, onUpdate, accountToEdit }: Props) {
  const [name, setName] = useState('');
  const [bank, setBank] = useState('');
  const [accountType, setAccountType] = useState<AccountType>('CHECKING');
  const [initialBalance, setInitialBalance] = useState('0.00');
  const [currency, setCurrency] = useState('EUR');
  const [color, setColor] = useState<string>('#0C447C');
  const [submitError, setSubmitError] = useState('');

  const isEditMode = Boolean(accountToEdit);

  useEffect(() => {
    if (!open) return;

    if (accountToEdit) {
      setName(accountToEdit.name);
      setBank(accountToEdit.bank);
      setAccountType(accountToEdit.type);
      setInitialBalance((accountToEdit.initialBalance / 100).toFixed(2));
      setCurrency(accountToEdit.currency);
      setColor(accountToEdit.color);
    } else {
      setName('');
      setBank('');
      setAccountType('CHECKING');
      setInitialBalance('0.00');
      setCurrency('EUR');
      setColor('#0C447C');
    }
  }, [open, accountToEdit]);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError('');

    const payload = {
      name,
      bank, 
      type: accountType,
      initialBalance: Math.round(Number(initialBalance) * 100),
      currency,
      color
    };

    const isEditing = isEditMode && accountToEdit;
    
    try {
      if (isEditing) {
        await onUpdate?.(accountToEdit.id, payload);
      } else {
        await onCreate?.(payload);
      }

      onClose();
    } catch {
      setSubmitError(
        isEditing
          ? 'Impossible de mettre à jour le compte. Vérifiez les informations saisies.'
          : 'Impossible de créer le compte. Vérifiez les informations saisies.'
      );
    }
}



  if (!open) return null;
  
  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0 mx-auto ml-16 lg:ml-72">
          <form
            onSubmit={handleSubmit}
            className="relative bg-white rounded-lg shadow-xl w-[80%] sm:my-8 sm:w-full sm:max-w-xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-5">
              <div className="flex flex-col">
                <span className="font-bold text-md  lg:text-xl">
                  {isEditMode ? 'Modifier le compte' : 'Nouvelle compte'}
                </span>
                <span className="text-sm text-gray-600 lg:text-md">
                  {isEditMode
                    ? 'Modifier votre compte personnalisée'
                    : 'Créer un compte personnalisée'}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="bg-slate-200 p-1 border border-gray-300 rounded-md cursor-pointer lg:p-2"
              >
                <IconX size={20} />
              </button>
            </div>
            <hr className="border" />

            {/* Corps du formulaire */}
            <div className="px-6 py-3">
              <div className="my-5 flex flex-col gap-2">
                <label>
                  Nom du compte <sup className="text-red-700">*</sup>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Voyage"
                  className="border p-2 rounded-sm"
                  required
                />
              </div>
              <div className="my-5 flex flex-col gap-2">
                <label>
                  Banque <sup className="text-red-700">*</sup>
                </label>
                <select
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  className="border p-2 rounded-sm"
                  required
                >
                  <option value="">Sélectionner une banque</option>
                  <option value="bnp-paribas">BNB Paribas</option>
                  <option value="boursorama">Boursorama Banque</option>
                  <option value="lcl">LCL</option>
                </select>
              </div>
              <div className="my-5 flex flex-col gap-2 ">
                <label>
                  Type de compte <sup className="text-red-700">*</sup>
                </label>
                <div className="flex justify-between gap-1 lg:gap-4">
                  <label className={`flex flex-col items-center border px-14 py-4 rounded-md cursor-pointer ${accountType === 'CHECKING' ? 'bg-[#E6F1FB] text-[#0C447C] border-[#93C0E6]' : ''}`}>
                    <input  
                      value="CHECKING" 
                      onChange={(e) => setAccountType(e.target.value as AccountType)}
                      type="radio" 
                      name="accountType" 
                      required 
                      hidden
                      checked={accountType === 'CHECKING'}
                    />
                    <IconBuildingBank stroke={2} />
                    Courant
                  </label>
                  <label className={`flex flex-col items-center border px-14 py-4 rounded-md cursor-pointer ${accountType === 'SAVINGS' ? 'bg-[#E6F1FB] text-[#0C447C] border-[#93C0E6]' : ''}`}>
                    <input 
                      type="radio" 
                      name="accountType" 
                      value="SAVINGS" 
                      required 
                      hidden
                      onChange={(e) => setAccountType(e.target.value as AccountType)}
                      checked={accountType === 'SAVINGS'}
                    />
                    <IconPigMoney stroke={2} />
                     épargne
                  </label>
                  <label className={`flex flex-col items-center border px-14 py-4 rounded-md cursor-pointer ${accountType === 'CREDIT' ? 'bg-[#E6F1FB] text-[#0C447C] border-[#93C0E6]' : ''}`}>
                    <input 
                      type="radio" 
                      name="accountType" 
                      value="CREDIT" 
                      required 
                      hidden
                      onChange={(e) => setAccountType(e.target.value as AccountType)}
                      checked={accountType === 'CREDIT'}
                    />
                    <IconCreditCard stroke={2} />
                    Credit
                  </label>
                </div>
              </div>
              <div className="flex flex-row gap-4 justify-between w-full">
                <div className="my-5 flex flex-col gap-2 flex-1">
                  <label>
                    Solde initial <sup className="text-red-700">*</sup>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={initialBalance}
                    onChange={(e) => setInitialBalance(e.target.value)}
                    placeholder="0.00"
                    className="border p-2 rounded-sm"
                    required
                  />
                </div>
                <div className="my-5 flex flex-col gap-2">
                  <label>
                    Devise <sup className="text-red-700">*</sup>
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="border p-2 rounded-sm"
                    required
                  >
                    <option value="">Sélectionner une devise</option>
                    <option value="EUR">Euro (€)</option>
                    <option value="USD">Dollar ($)</option>
                    <option value="GBP">Livre (£)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {submitError && <p role="alert" className="text-sm text-red-700 sm:mr-auto sm:self-center">{submitError}</p>}
              <input
                type="submit"
                value={
                  isEditMode
                    ? 'Enregistrer les modifications'
                    : 'Créer la catégorie'
                }
                className="cursor-pointer inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 sm:ml-3 sm:w-auto"
              />
              <button
                type="button"
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 border border-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}