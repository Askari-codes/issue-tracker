'use client'
import { TextArea, TextField,Button } from '@radix-ui/themes'
import React from 'react'


const NewIssuePage = () => {
  return (
    <div className='max-w-[50%] space-y-3  mt-2 '>
     <TextField.Root placeholder='Title'>
     </TextField.Root>
     <TextArea placeholder='description'/>
     <Button>Submit New Issue</Button>
    </div>
  )
}

export default NewIssuePage
