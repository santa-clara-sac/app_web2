'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton, useUser } from '@clerk/nextjs'

function Header() {

  const path = usePathname();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    console.log(path);
  }, [])


  return (
    <div className='p-4 px-10 flex justify-between shadow-sm fixed top-0 w-full z-10 bg-white'>
      <div className='flex gap-12 items-center'>
        <Image src="/logo.svg" alt="Logo" width={50} height={50} />
        <ul className='hidden md:flex gap-10'>
          <Link href="/">
            <li className={`hover:text-primary font-medium text-sm cursor-pointer ${path === '/' ? 'text-primary' : ''}`}>
              Para venta
            </li>
          </Link>
          <Link href={'/rent'} >
            <li className={`'hover:text-primary 
                 font-medium text-sm cursor-pointer'
                 ${path == '/rent' && 'text-primary'}`}>Para alquiler</li>
          </Link>
          <li className='hover:text-primary font-medium text-sm cursor-pointer'>Otros</li>
        </ul>
      </div>
      <div className='flex gap-2 items-center'>
        <Link href={'/add-new-listing'}>
          <Button className='flex gap-2'><Plus className='h-5 w-5' />Publicar anuncio</Button>
        </Link>
        {isSignedIn ?
          <UserButton />
          :
          <Link href={'/sign-in'}>
            <Button variant='outline'>Login</Button>
          </Link>
        }
      </div>
    </div >
  )
}

export default Header