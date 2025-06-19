import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Bath, Bed, BedDouble, CarFront } from 'lucide-react'

function FilterSection({ setBathCount, setBedCount, setParkingCount, setHomeType }) {
    return (
        <div className='px-3 py-2 grid grid-cols-2 
    md:flex gap-2'>
            <Select onValueChange={setBedCount}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Habitaciones" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="2">
                        <h2 className='flex gap-2'>
                            <BedDouble className='h-5 w-5 text-primary' /> 2+</h2>
                    </SelectItem>
                    <SelectItem value="3">
                        <h2 className='flex gap-2'>
                            <BedDouble className='h-5 w-5 text-primary' /> 3+</h2>
                    </SelectItem>
                    <SelectItem value="4">
                        <h2 className='flex gap-2'>
                            <BedDouble className='h-5 w-5 text-primary' /> 4+</h2>
                    </SelectItem>
                    <SelectItem value="5">
                        <h2 className='flex gap-2'>
                            <BedDouble className='h-5 w-5 text-primary' /> 5+</h2>
                    </SelectItem>


                </SelectContent>
            </Select>

            <Select onValueChange={setBathCount}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Baño" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="2">
                        <h2 className='flex gap-2'>
                            <Bath className='h-5 w-5 text-primary' /> 2+</h2>
                    </SelectItem>
                    <SelectItem value="3">
                        <h2 className='flex gap-2'>
                            <Bath className='h-5 w-5 text-primary' /> 3+</h2>
                    </SelectItem>
                    <SelectItem value="4">
                        <h2 className='flex gap-2'>
                            <Bath className='h-5 w-5 text-primary' /> 4+</h2>
                    </SelectItem>
                    <SelectItem value="5">
                        <h2 className='flex gap-2'>
                            <Bath className='h-5 w-5 text-primary' /> 5+</h2>
                    </SelectItem>
                </SelectContent>
            </Select>

            <Select onValueChange={setParkingCount}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Estacionamiento" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1+">
                        <h2 className='flex gap-2'>
                            <CarFront className='h-5 w-5 text-primary' /> 1+</h2>
                    </SelectItem>
                    <SelectItem value="2">
                        <h2 className='flex gap-2'>
                            <CarFront className='h-5 w-5 text-primary' /> 2+</h2>
                    </SelectItem>
                    <SelectItem value="3">
                        <h2 className='flex gap-2'>
                            <CarFront className='h-5 w-5 text-primary' /> 3+</h2>
                    </SelectItem>


                </SelectContent>
            </Select>
            <Select onValueChange={(value) => value == 'All' ?
                setHomeType(null) : setHomeType(value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo de casa" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">
                        Todo
                    </SelectItem>
                    <SelectItem value="Casa unifamiliar">
                        Casa unifamiliar
                    </SelectItem>
                    <SelectItem value="Casa de pueblo">
                        Casa de pueblo
                    </SelectItem>
                    <SelectItem value="Condominio">
                        Condominio
                    </SelectItem>


                </SelectContent>
            </Select>

        </div>
    )
}

export default FilterSection