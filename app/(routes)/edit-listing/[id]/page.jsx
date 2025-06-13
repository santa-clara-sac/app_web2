'use client'
import React, { useEffect } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Formik } from 'formik'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { supabase } from '@/utils/supabase/client'
import { toast } from 'sonner'

function EditListing() {

    const params = usePathname();

    useEffect(() => {
        console.log(params.split('/')[2]);
    }, [])

    const onSubmitHanler = async (formValue) => {
        const { data, error } = await supabase
            .update(formValue)
            .eq('id', params.split('/')[2])
            .select();

        console.log(data);
        if (data) {
            console.log(data);
            toast("Listado actualizado y publicado")
        }
    }

    return (
        <div className='px-10 md:px-36 my-10'>
            <h2 className='font-bold text-2xl'>Ingrese más detalles sobre su anuncio</h2>

            <Formik
                initialValues={{
                    type: '',
                    propertyType: ''
                }}
                onSubmit={(values) => {
                    console.log(values);
                    onSubmitHanler(values);
                }}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className='p-8 rounded-lg shadow-md'>
                            <div className='grid grid-cols-1 md:grid-cols-3'>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-lg text-slate-500'>¿Alquiler o venta?</h2>

                                    <RadioGroup defaultValue="Venta"
                                        onValueChange={(v) => values.type = v}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Alquiler" id="Alquiler" />
                                            <Label htmlFor="Alquiler">Alquiler</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Venta" id="Venta" />
                                            <Label htmlFor="Venta">Venta</Label>
                                        </div>
                                    </RadioGroup>

                                </div>

                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-lg text-slate-500'>Tipo de propiedad</h2>
                                    <Select
                                        onValueChange={(e) => values.propertyType = e}
                                        name="propertyType">
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Seleccionar tipo de propiedad" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Casa unifamiliar">Casa unifamiliar</SelectItem>
                                            <SelectItem value="Casa de pueblo">Casa de pueblo</SelectItem>
                                            <SelectItem value="Condominio">Condominio</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5'>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Dormitorios</h2>
                                    <Input type="number" placeholder="Ex.2" name="dormitorio"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Baños</h2>
                                    <Input type="number" placeholder="Ex.2" name="baños"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Incorporado</h2>
                                    <Input placeholder="Ex.2" onChange={handleChange} name="incorporado" />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5'>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Estacionamiento</h2>
                                    <Input placeholder="Ex.2" onChange={handleChange} name="estacionamiento" />
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Tamaño del lote (m2)</h2>
                                    <Input type="number" placeholder="Ex.2" onChange={handleChange} name="tam_lote" />
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Area</h2>
                                    <Input type="number" placeholder="Ex.2" onChange={handleChange} name="area" />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5'>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Precio de venta ($)</h2>
                                    <Input type="number" placeholder="Ex.2" onChange={handleChange} name="precio_venta" />
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Tamaño del lote (m2)</h2>
                                    <Input type="number" placeholder="Ex.2" onChange={handleChange} name="tam_lote" />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 gap-10'>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Descripción</h2>
                                    <Textarea placeholder="" name="descripcion" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='flex gap-7 justify-end'>
                                <Button variant="outline" className="text-primary border-primary">Guardar</Button>
                                <Button className="">Guardar y publicar</Button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div >
    )
}

export default EditListing