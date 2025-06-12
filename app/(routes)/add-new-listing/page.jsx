import React from 'react'

function AddNewListing() {
    return (
        <div className='p-10 flex flex-col gap-5 items-center justify-center'>
            <h2 className='font-bold text-2xl'>Añadir nuevo listado</h2>
            <div>
                <h2 className='text-gray-500'>Ingrese la dirección que desea incluir en el listado</h2>
            </div>
        </div>
    )
}

export default AddNewListing