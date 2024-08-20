import React, { useRef, useState, useEffect } from 'react';
import { uploadfile } from '../services/api';

function Form() {
  const [file, setFile] = useState(null); // Use `null` instead of an empty string for better clarity
  const [uploading, setUploading] = useState(false); // State for managing upload status
  const [error, setError] = useState(null); // State for managing errors
  const [uploadedFilePath, setUploadedFilePath] = useState(null); // State for the uploaded file path
  const fileInputRef = useRef();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const uploadImage = async () => {
      if (file) {
        setUploading(true); // Set uploading state to true when the file is being uploaded
        setError(null); // Reset any previous errors
        try {
          const data = new FormData();
          data.append('name', file.name);
          data.append('file', file);
        
           
          const res = await uploadfile(data);
          
          
          setUploadedFilePath(res.path); 
          // Assuming the response contains the file path
          alert("file uploaded")
          console.log('File uploaded successfully:', res);
        } catch (err) {
          setError('Failed to upload file'); // Set an error message if the upload fails
          console.error('Upload error:', err);
        } finally {
          setUploading(false); // Set uploading state back to false
        }
      }
    };

    uploadImage();
  }, [file]);

  return (
    <>
      <div className='w-1/2 h-1/2 border-x-2 rounded-lg m-auto mt-10 flex flex-col justify-center items-center p-3 bg-neutral-900'>
        <h1 className='font-serif text-3xl first-letter:text-4xl first-letter:text-violet-600 bg-transparent'>Share a File</h1>
        <p className='bg-transparent'>Transfer and have your files travel for free</p>
        <p className='bg-transparent'>Transfer is a simple and free way to safely share your data</p>
        <button 
          onClick={handleClick} 
          className='bg-slate-500 rounded-lg px-3 py-1 mt-4 hover:scale-105 duration-100'
          disabled={uploading} // Disable the button while uploading
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        <input 
          type='file' 
          name='file'
          className='hidden' 
          ref={fileInputRef} 
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* Display the uploaded file path */}
        {uploadedFilePath && (
          <div className='mt-4 bg-transparent'>
            <p className='text-green-500'>File uploaded successfully:</p>
            <a 
              href={uploadedFilePath} 
              target='_blank' 
              rel='noopener noreferrer' 
              className='text-blue-500'
            >
              {uploadedFilePath}
            </a>
          </div>
        )}

        {/* Display error message if upload fails */}
        {error && <p className='text-red-500 mt-4'>{error}</p>}
      </div>
    </>
  );
}

export default Form;
