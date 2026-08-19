
const RecentTransactions = () => {
    return(
        <div className="flex flex-col gap-3 bg-white border rounded-md p-6">
            <span className=' font-semibold'>Transactions récentes</span>
            <div className='flex justify-between'>
                <p className='flex flex-col gap-0'>
                <span className='font-semibold'>Carrefour City</span>
                <span className='text-sm text-gray-500'>Alimentation · 08 mai</span>
                </p>
                <span className='text-red-700 font-semibold'>-42,80 €</span>
            </div>
            <div className='flex justify-between'>
                <p className='flex flex-col gap-0'>
                <span className='font-semibold'>Carrefour City</span>
                <span className='text-sm text-gray-500'>Alimentation · 08 mai</span>
                </p>
                <span className='text-red-700 font-semibold'>-42,80 €</span>
            </div>
            <div className='flex justify-between'>
                <p className='flex flex-col gap-0'>
                <span className='font-semibold'>Carrefour City</span>
                <span className='text-sm text-gray-500'>Alimentation · 08 mai</span>
                </p>
                <span className='text-red-700 font-semibold'>-42,80 €</span>
            </div>
            <div className='flex justify-between'>
                <p className='flex flex-col gap-0'>
                <span className='font-semibold'>Carrefour City</span>
                <span className='text-sm text-gray-500'>Alimentation · 08 mai</span>
                </p>
                <span className='text-red-700 font-semibold'>-42,80 €</span>
            </div>
        </div>
    )
}

export default RecentTransactions;