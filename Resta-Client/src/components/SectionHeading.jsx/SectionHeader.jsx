import React from 'react';

const SectionHeader = ({heading, subHeading}) => {
    return (
        <div className='mx-auto md:w-4/12 text-center mb-4'>

            <p className='text-yellow-400'>---{subHeading}---</p>
            <h3 className='text-yellow-400 sm: text-xl lg:text-4xl uppercase border-y-4 py-2'>{heading}</h3>
            
        </div>
    );
};

export default SectionHeader;