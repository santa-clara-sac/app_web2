"use client"
import { UserButton, UserProfile } from '@clerk/nextjs'
import { Building2 } from 'lucide-react'
import React from 'react'
import UserListing from '../_components/UserListing'

function User() {
  return (
    <div className='flex items-center justify-center '>
      <div className=''>
        <h2 className='font-bold text-2xl py-3'>Profile</h2>
        <UserProfile>
            <UserButton.UserProfilePage
            label='My Listing'
            labelIcon={<Building2 className='h-5 w-5' />}
            url="my-listing"
            >
                <UserListing/>
            </UserButton.UserProfilePage>
        </UserProfile>
    </div>
    </div>
  )
}

export default User