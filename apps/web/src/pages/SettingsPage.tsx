export function SettingsPage() {
  return (
    <main className="min-w-0 px-6 py-5">
      <div className="grid grid-cols-[180px_1fr] gap-6">
        {/* Navigation latérale */}
        <nav className="flex flex-col gap-0.5 text-[13px]">
          <a className="cursor-pointer rounded-md bg-[#F9F8F4] px-3 py-2 font-medium text-[#1A1A17]">
            Profil
          </a>
          <a className="cursor-pointer rounded-md px-3 py-2 text-[#79776F]">Préférences</a>
          <a className="cursor-pointer rounded-md px-3 py-2 text-[#79776F]">Notifications</a>
          <a className="cursor-pointer rounded-md px-3 py-2 text-[#79776F]">Sécurité</a>
          <a className="cursor-pointer rounded-md px-3 py-2 text-[#79776F]">Données</a>
          <a className="cursor-pointer rounded-md px-3 py-2 text-[#79776F]">Facturation</a>
        </nav>

        <div>
          <h2 className="mb-[3px] text-xl">Profil</h2>
          <p className="mb-5 text-[13px] text-[#79776F]">Vos informations personnelles</p>

          <div className="mb-3.5 rounded-lg border border-[#E8E6DE] bg-white p-[18px]">
            {/* Avatar */}
            <div className="mb-[18px] flex items-center gap-3.5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EFF6FD] text-xl font-medium text-[#1C5E9E]">
                SD
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-medium">Sarah Demo</p>
                <p className="text-xs text-[#79776F]">Membre depuis mai 2026</p>
              </div>
              <button
                type="button"
                className="h-8 rounded-md border border-[#DFDDD4] bg-white px-3 text-xs"
              >
                Changer la photo
              </button>
            </div>

            <div className="mb-3 grid grid-cols-2 gap-3">
              <div>
                <label className="mb-[5px] block text-xs font-medium">Prénom</label>
                <input
                  type="text"
                  defaultValue="Sarah"
                  className="h-[34px] w-full rounded-md border border-[#DFDDD4] px-2.5 text-[13px]"
                />
              </div>
              <div>
                <label className="mb-[5px] block text-xs font-medium">Nom</label>
                <input
                  type="text"
                  defaultValue="Demo"
                  className="h-[34px] w-full rounded-md border border-[#DFDDD4] px-2.5 text-[13px]"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="mb-[5px] block text-xs font-medium">Email</label>
              <input
                type="email"
                defaultValue="demo@finflow.com"
                className="h-[34px] w-full rounded-md border border-[#DFDDD4] px-2.5 text-[13px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-[5px] block text-xs font-medium">Devise</label>
                <select className="h-[34px] w-full rounded-md border border-[#DFDDD4] px-2 text-[13px]">
                  <option>EUR — Euro</option>
                </select>
              </div>
              <div>
                <label className="mb-[5px] block text-xs font-medium">Langue</label>
                <select className="h-[34px] w-full rounded-md border border-[#DFDDD4] px-2 text-[13px]">
                  <option>Français</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-6 flex justify-end gap-2">
            <button
              type="button"
              className="h-8 rounded-md border border-[#DFDDD4] bg-white px-3.5 text-[13px]"
            >
              Annuler
            </button>
            <button type="button" className="h-8 rounded-md bg-[#378ADD] px-3.5 text-[13px] text-white">
              Enregistrer
            </button>
          </div>

          {/* Zone dangereuse */}
          <div className="border-t border-[#E8E6DE] pt-5">
            <h3 className="mb-[3px] text-[15px] text-[#A32D2D]">Zone dangereuse</h3>
            <p className="mb-3 text-xs text-[#79776F]">Actions irréversibles</p>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-[#E5B4B4] bg-white p-3.5">
              <div>
                <p className="text-[13px] font-medium">Supprimer mon compte</p>
                <p className="mt-0.5 text-xs text-[#79776F]">
                  Toutes vos données seront effacées définitivement
                </p>
              </div>
              <button
                type="button"
                className="h-8 shrink-0 rounded-md border border-[#E5B4B4] bg-white px-3 text-xs text-[#A32D2D]"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}