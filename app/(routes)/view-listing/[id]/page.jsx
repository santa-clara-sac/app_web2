export const dynamic = 'force-dynamic'; // obliga SSR
export const dynamicParams = true; // ✅ habilita params dinámicos para SSG híbrido

import { supabase } from '@/utils/supabase/client'
import Slider from '../_components/Slider'
import Details from '../_components/Details'

export default async function ViewListing({ params }) {
    const { id } = params; // ahora funciona bien

    const { data, error } = await supabase
        .from('listing')
        .select('*, listingImages(url, listing_id)')
        .eq('id', id)
        .eq('active', true);

    const listingDetail = data?.[0];

    return (
        <div className='px-4 md:px-32 lg:px-56 py-5'>
            <Slider imageList={listingDetail?.listingImages} />
            <Details listingDetail={listingDetail} />
        </div>
    );
}
