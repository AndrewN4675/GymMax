'use client'

import React, { useCallback } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { UploadImage } from './trainerInfo-db'
import './style.css'

export default function ImageDropBox({ trainerId = 0 }) {

    const onDrop = useCallback((acceptedImage: FileWithPath[]) => {
        const uploadImage = async () => {
            await UploadImage(Number(trainerId), acceptedImage[0]);
            window.location.reload(); // refresh page to show updated profile picture
        };
        uploadImage();
    }, []);
      
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg', '.jpg'],
        },
        maxSize: (4.5) * 1024 * 1024, // Max size is 4.5 MB due to restrictions with Vercel blob
    });

    return(
        <div className='upload-container'>
            <div {...getRootProps()}>
                <input {...getInputProps()}/>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src='/upload-cloud.svg' className='w-[25px] h-[25px]' />
                    <p style={{ fontSize: '12px', color: '#555', margin: '0' }}>Drag & Drop Your Image or
                        <span style={{ color: '#0078d4', marginLeft: '5px', cursor: 'pointer' }}>Browse</span>
                    </p>
                </div>
            </div>
        </div>
    );
}