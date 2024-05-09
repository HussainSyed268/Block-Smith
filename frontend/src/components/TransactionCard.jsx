export default function TransactionCard(props) {
    return(
        <>
            <div className=' flex w-full border-b-2 border-[#303030] '>
                        <h1 className='text-white text-sm px-6 py-4 w-1/3'>
                            {props.date}
                        </h1>
                        <h1 className='text-white text-sm px-6 py-4 w-1/5'>
                            {props.type}
                        </h1>
                        <h1 className='text-white text-sm px-6 py-4 w-3/5 '>
                            {props.details}
                        </h1>
                    </div>
        </>
    )}