import { Button } from '@/components/ui/button';
import { supabase } from '@/utils/supabase/client';
import { useUser } from '@clerk/nextjs';
import { Bath, BedDouble, MapPin, Ruler, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function UserListing() {
  const { user } = useUser();
  const [listing, setListing] = useState();

  useEffect(() => {
    user && GetUserListing();
  }, [user]);

  const GetUserListing = async () => {
    const { data, error } = await supabase
      .from('listing')
      .select(`*, listingImages(url, listing_id)`)
      .eq('createdBy', user?.primaryEmailAddress.emailAddress);

    setListing(data);
    console.log(data);
  };

  return (
    <div>
      <h2 className="font-bold text-2xl mb-4">Administra tus anuncios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listing &&
          listing.map((item, index) => (
            <div
              key={item.id || index}
              className="p-3 hover:border hover:border-primary rounded-lg cursor-pointer relative bg-gray-100"
            >
              {/* Estado: Published o Draft */}
              <h2 className="bg-primary rounded-lg text-white absolute top-2 left-2 px-2 text-sm py-1 z-10">
                {item.active ? 'Published' : 'Draft'}
              </h2>

              {/* Imagen */}
              <Image
                src={item?.listingImages?.[0]?.url || '/placeholder.svg'}
                width={800}
                height={150}
                className="rounded-lg object-cover h-[170px] w-full"
                alt={`Listing image of ${item?.address || 'property'}`}
              />

              {/* Contenido de la tarjeta */}
              <div className="flex mt-2 flex-col gap-3">
                <h2 className="font-bold text-xl">${item?.price}</h2>
                <h2 className="flex gap-2 text-sm text-gray-400">
                  <MapPin className="h-4 w-4" />
                  {item.address}
                </h2>

                {/* Características */}
                <div className="flex gap-2 mt-1 justify-between">
                  <div className="flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-500 justify-center items-center">
                    <BedDouble className="h-4 w-4" />
                    {item?.bedroom}
                  </div>
                  <div className="flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-500 justify-center items-center">
                    <Bath className="h-4 w-4" />
                    {item?.bathroom}
                  </div>
                  <div className="flex gap-2 w-full text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center">
                    <Ruler className="h-4 w-4" />
                    {item?.area}
                  </div>
                </div>

                {/* Botones con separación */}
                <div className="flex flex-col gap-2 mt-2">
                  <Link href={`/view-listing/${item.id}`} className="w-full">
                    <Button size="sm" className="w-full" variant="outline">
                      View
                    </Button>
                  </Link>
                  <Link href={`/edit-listing/${item.id}`} className="w-full">
                    <Button size="sm" className="w-full bg-sky-400 text-white hover:bg-sky-500">
                      Edit
                    </Button>
                  </Link>
                  <Button size="sm" variant="destructive" className="w-full">
                    <Trash />
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserListing;
