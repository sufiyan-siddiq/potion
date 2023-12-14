'use client'
import React, { useState } from "react"
import { updateDoc } from '@/app/_comps/actions'

import { SingleImageDropzone } from './Single_Image_Dropzone';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import Spinner from '@/app/_comps/Spinner'
import { useToast } from "@/components/ui/use-toast";

const DialogButton = ({ edgestore, coverUpdate, id, userId, coverImg, update }) => {
  const { toast } = useToast()

  const text = coverUpdate ? 'Change cover' : 'Add cover'
  const [isSubmitting, setisSubmitting] = useState(false)
  const [file, setFile] = useState();


  const handleUpload = async () => {
    try {
      setisSubmitting(true)
      var edgeRes;
      if (coverUpdate) {
        edgeRes = await edgestore.publicFiles.upload({
          file, options: {
            replaceTargetUrl: coverImg,
          },
        })
      }
      else
        edgeRes = await edgestore.publicFiles.upload({ file })

      const res = await updateDoc(id, userId, edgeRes.url)
      if (res === 200)
        toast({ description: "cover updated" })
      else
        toast({ variant: "destructive", description: "cover update failed" })
      update()
    } catch (error) {
      toast({ variant: "destructive", description: "cover update failed" })
    } finally {
      setisSubmitting(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger><Button variant='outline' className='text-xs'>{text}</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader className='space-y-4'>
          <DialogTitle className='text-center'>{text}</DialogTitle>
          <DialogDescription>
            <SingleImageDropzone
              className='mx-auto border border-[#C55DF6]'
              width={450}
              height={250}
              value={file}
              onChange={(file) => {
                setFile(file);
              }}
            />
            <Button disabled={isSubmitting || !file} variant='outline' className='text-white mt-2 ml-[80%]' onClick={handleUpload}>Upload &nbsp; {isSubmitting && <Spinner />}</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DialogButton
