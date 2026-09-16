

export const SummaryBudget = () => {
    return (
        <div className="mb-4 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-[#F9F8F4] px-3.5 py-3">
          <p className="text-xs text-[#6B6B66]">Total budgeté</p>
          <p className="mt-1 text-xl font-medium">1 950 €</p>
        </div>
        <div className="rounded-lg bg-[#F9F8F4] px-3.5 py-3">
          <p className="text-xs text-[#6B6B66]">Dépensé</p>
          <p className="mt-1 text-xl font-medium">1 647 €</p>
          <p className="mt-0.5 text-[11px] text-[#6B6B66]">84 % du budget</p>
        </div>
        <div className="rounded-lg bg-[#F9F8F4] px-3.5 py-3">
          <p className="text-xs text-[#6B6B66]">Restant</p>
          <p className="mt-1 text-xl font-medium text-[#0F6E56]">303 €</p>
        </div>
      </div>
    )
}