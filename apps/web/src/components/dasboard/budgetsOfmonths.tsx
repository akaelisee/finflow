
const BudgetsOfmonths = () => {
    return(
        <div className="flex flex-col gap-3 bg-white border rounded-md p-6">
          <div className="flex justify-between">
            <span className=' font-bold text-xl'>Transactions récentes</span>
            <span className=''>Gérer</span>
          </div>
          <div className=''>
            <div className="flex justify-between">
              <div>
                <span className="mr-3">icon</span>
                <span>Alimentation</span>
              </div>
              <span>405 / 500</span>
            </div>
            <div className="mt-2 w-full h-2 rounded-xl bg-gray-200">
              <div className="w-1/2 h-2 rounded-xl bg-red-700"></div>
            </div>
          </div>
          <div className=''>
            <div className="flex justify-between">
              <div>
                <span className="mr-3">icon</span>
                <span>Alimentation</span>
              </div>
              <span>405 / 500</span>
            </div>
            <div className="mt-2 w-full h-2 rounded-xl bg-gray-200">
              <div className="w-1/2 h-2 rounded-xl bg-red-700"></div>
            </div>
          </div>
        </div>
    )
}

export default BudgetsOfmonths;