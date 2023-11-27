import React, { useEffect, useState } from 'react';

export default function ShowListBtn({updateListState} : any) {
    const [showList, setShowList] = useState(true);

    const handleClick = () => {
        setShowList(!showList);
        updateListState(!showList);
    };

    // There might be a case where the user might want to try to trick us
    // And hide the list and then resize the window. In that case, let's 
    // make sure that it is always present when the point md is the current media
    // window size
    useEffect(() => {
        const handleResize = () => {
            // I think it's better if we just make it true at any resize..
            const isMd = window.matchMedia('(min-width: 768px)').matches;
            const test = true;
            setShowList(test);
            updateListState(test);
        };

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Set initial state
        handleResize();

        // Remove event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div onClick={handleClick} className="z-20
                                              p-3
                                              justify-end 
                                              cursor-pointer 
                                              absolute
                                              bottom-0 
                                              right-0
                                              m-4
                                              md:hidden
                                              bg-white 
                                              rounded-full">
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
