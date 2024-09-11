"use client"
import React from 'react'
import Dashboard from '@/app/Dashboard/page'
import Cleander from '@/app/component/cleander/page'


const page = () => {
  return (
    <Dashboard>
      <div>
       <Cleander/>
      </div>
    </Dashboard>
  )
}

export default page