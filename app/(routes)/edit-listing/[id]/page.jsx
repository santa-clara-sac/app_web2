'use client'
import React, { useEffect, useState, use } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea";
import { useUser } from '@clerk/nextjs'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Formik } from 'formik'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase/client'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'
import FileUpload from '../_components/FileUpload'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function EditListing({ params: paramsPromise }) {
  const params = use(paramsPromise); // ✅ sin error de redeclaración
  const { user } = useUser();
  const router = useRouter();
  const [listing, setListing] = useState([])
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(user?.imageUrl)
        user && verifyUserRecord();
    }, [user]);

    const verifyUserRecord = async () => {
        const { data, error } = await supabase
            .from('listing')
            .select('*,listingImages(listing_id,url)')
            .eq('createdBy', user?.primaryEmailAddress.emailAddress)
            .eq('id', params.id); // ✅ correcto uso

            if (data) {
                console.log(data)
                setListing(data[0]);
            }
            if (data?.length <= 0) {
                router.replace('/')
            }
    }
        
    const onSubmitHanler = async (formValue) => {
        setLoading(true);
        const { data, error } = await supabase
            .from("listing")
            .update(formValue)
            .eq('id', params.id)
            .select();

        if (data) {
            console.log(data);
            toast('Listing updated and Published');
            setLoading(false)
        }
        for (const image of images) {
            setLoading(true)
            const file = image;
            const fileName = Date.now().toString();
            const fileExt = fileName.split('.').pop();
            const { data, error } = await supabase.storage
                .from('listingimages')
                .upload(`${fileName}`, file, {
                    contentType: `image/${fileExt}`,
                    upsert: false
                });

            if (error) {
                setLoading(false)
                toast('Error while uploading images')
            }

            else {

                const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL + fileName;
                console.log(imageUrl);
                
                const { data, error } = await supabase
                    .from('listingImages')
                    .insert([
                        { url: imageUrl, listing_id: params?.id }
                    ])
                    .select();
                    console.log("---");
                    console.log(data);
                    console.log("---");
                    
                if (data) {
                    setLoading(false);
                }
                if (error) {
                    setLoading(false)
                }

            }
            setLoading(false);
        }
    }

    const publishBtnHandler=async()=>{
        setLoading(true)
        const { data, error } = await supabase
        .from('listing')
        .update({ active: true })
        .eq('id', params?.id)
        .select()

        if(data)
        {
            setLoading(false)
            toast('Listing published!')
        }   
    }

    return (
        <div className='px-10 md:px-36 my-10'>
            <h2 className='font-bold text-2xl'>Ingrese más detalles sobre su anuncio</h2>

            <Formik
                initialValues={{
                    type: '',
                    propertyType: '',
                    profileImage:user?.imageUrl,
                    fullName:user?.fullName
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

                                    <RadioGroup defaultValue={listing?.type}
                                        onValueChange={(v) => values.type = v}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Alquiler" id="Alquiler" />
                                            <Label htmlFor="Alquiler" className="text-lg">Alquiler</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Venta" id="Venta" />
                                            <Label htmlFor="Venta" className="text-lg">Venta</Label>
                                        </div>
                                    </RadioGroup>

                                </div>

                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-lg text-slate-500'>Tipo de propiedad</h2>
                                    <Select
                                        onValueChange={(e) => values.propertyType = e}
                                        defaultValue={listing?.propertyType}
                                        name="propertyType">
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder={listing?.propertyType ? listing?.propertyType :"Seleccionar tipo de propiedad"} />
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
                                    <Input type="number" placeholder="Ex.2"
                                    defaultValue={listing?.bedroom}
                                    name="bedroom"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Baños</h2>
                                    <Input type="number" placeholder="Ex.2" defaultValue={listing?.bathroom} name="bathroom"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Incorporado</h2>
                                    <Input placeholder="Ex.2" onChange={handleChange} defaultValue={listing?.builtln} name="builtln" />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5'>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Estacionamiento</h2>
                                    <Input placeholder="Ex.2" onChange={handleChange} defaultValue={listing?.parking} name="parking" />
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Tamaño del lote (m2)</h2>
                                    <Input type="number" placeholder="Ex.2" onChange={handleChange} defaultValue={listing?.lotSize} name="lotSize" />
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Area</h2>
                                    <Input type="number" placeholder="Ex.2" onChange={handleChange} defaultValue={listing?.area} name="area" />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5'>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Precio de venta ($)</h2>
                                    <Input type="number" placeholder="Ex.2" onChange={handleChange} defaultValue={listing?.price} name="price" />
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Tamaño del lote (m2)</h2>
                                    <Input type="number" placeholder="Ex.2" onChange={handleChange} defaultValue={listing?.hoa} name="hoa" />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 gap-10'>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Descripción</h2>
                                    <Textarea placeholder="" name="description" defaultValue={listing?.description} onChange={handleChange} />
                                </div>
                            </div>
                            <div>
                                <h2 className='font-lg text-gray-500 my-2'>Upload Property Images</h2>
                                    <FileUpload
                                        setImages={(value) => setImages(value)}
                                        imageList={listing.listingImages}
                                    />
                                </div>

                            <div className='flex gap-7 justify-end'>
                                    <Button disabled={loading} variant="outline" className="text-primary border-primary">
                                        {loading ? <Loader className='animate-spin' /> : 'Save'}
                                    </Button>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                        <Button type="button" disabled={loading} className="">
                                        {loading ? <Loader className='animate-spin' /> : 'Save & Publish'}
                                    </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Ready to Publish?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                   Do you really want to publish the listing?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={()=>publishBtnHandler()} >
                                                    {loading?<Loader className='animate-spin'/>:'Continue'}
                                                    </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div >
    )
}

export default EditListing