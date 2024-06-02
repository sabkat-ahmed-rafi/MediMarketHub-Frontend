import React from 'react';

const Header = ({title, description}) => {
    return (
        <>
            <section className='text-center py-8'>
                <h1 className='text-3xl font-semibold italic'>{title}</h1>
                <p className='italic'>{description}</p>
            </section>
        </>
    );
};

export default Header;