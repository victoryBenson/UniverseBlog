import { useState } from 'react'
import ForgotPassword from './ForgotPassword';
import VerifyOTP from './VerifyOTP';
import NewPassword from './NewPassword';

const RestorePasswordDashboard = () => {
    const [activePage, setActivePage] = useState<number>(1);

    const TotalPages = 3;

    const handlePageChange = (step: number) => {
        setActivePage(step);
    };


    // const nextPage =()=> {
    //     if(activePage < TotalPages) {
    //         setActivePage(activePage + 1)
    //     }
    // };

    // const previousPage =()=> {
    //     if(activePage > 1) {
    //         setActivePage(activePage - 1)
    //     }
    // };


    const displayPage =() =>{
        switch (activePage) {
            case 1:
                return <ForgotPassword/>
            case 2:
                return <VerifyOTP/>
            case 3:
                return <NewPassword/>
            default:
                return null;
        }
    }

    

  return (
    <div>
        <div className="pagination gap-4 p-4 left-0 lg:right-1/2 lg:left-1/2 flex fixed z-50 top-10">
            {Array.from({ length: TotalPages }, (_, index) => (
            <button
                key={index + 1}
                className={`pagination-btn ${activePage === index + 1 ? 'text-blue1 text-5xl' : 'text-darkGray'}`}
                onClick={() => handlePageChange(index + 1)}
            >
                {index + 1}
            </button>
            ))}
        </div>
        {displayPage()}
        {/* <div className=' gap-4 p-4 flex fixed z-50 bottom-20 right-10 '>
            <button onClick={() => handlePageChange(activePage - 1)} disabled={activePage === 1}>
            Previous
            </button>
            <button onClick={() => handlePageChange(activePage + 1)} disabled={activePage === TotalPages}>
            Next
            </button>
      </div> */}
    </div>
  )
}

export default RestorePasswordDashboard