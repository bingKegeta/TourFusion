import React, { useEffect, useState } from 'react';

export default function BackToList({updateStateList} : any) {
    const handleClick = () => {
        updateStateList(null);
    };

    return (
        <div onClick={handleClick} className="z-20
                                              p-3
                                              justify-end 
                                              cursor-pointer 
                                              absolute
                                              bottom-0 
                                              left-0
                                              m-4
                                              bg-white
                                              text-black
                                              text-2xl
                                              rounded-full">
            ⬴
        </div>
    );
}
