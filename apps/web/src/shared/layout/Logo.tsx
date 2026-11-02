export default function Logo () {
    return(
        <div className="flex relative items-center gap-x-4">
            <div className="w-12 h-12 p-4 rounded-lg bg-[#378ADD] border-0 relative mx-auto lg:mx-0">
            <div className='absolute text-white font-semibold text-2xl top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2'>F</div>
            </div>
            <span className='font-semibold text-2xl hidden lg:block'>FinFlow</span>
        </div>
    )
}