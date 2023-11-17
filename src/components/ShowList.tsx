import React, { useState } from 'react';

export default function ShowList({updateListState} : any) {
    const [showList, setShowList] = useState(true);

    const handleClick = () => {
        setShowList(!showList);
        updateListState(!showList);
    };

    return (
        <div onClick={handleClick} className="z-20 
                                              flex 
                                              m-4 
                                              justify-end 
                                              cursor-pointer 
                                              absolute
                                              bottom-0 
                                              right-0 
                                              bg-white 
                                              rounded-lg">
            {showList ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            )}
        </div>
    );
}
