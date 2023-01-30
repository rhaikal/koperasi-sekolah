import { useEffect } from "react";
import InputError from "./InputError";

export default function ImageUpload({defaultValue, value, handleFile, errors, name}) {
    useEffect(() => {
        if(!!defaultValue){
            const previewImg = document.getElementById('preview-img')
            previewImg.src = '/storage/' + defaultValue
        }
    }, [defaultValue])

    useEffect(() => {
        if(value) {
            const previewImg = document.getElementById('preview-img')
            previewImg.src = URL.createObjectURL(value)
            previewImg.onload = () => URL.revokeObjectURL(previewImg.src)
        }
    }, [value])

    return (
        <label htmlFor="dropzone-file" className={`flex flex-col items-center justify-center w-full h-full ${!!value || !!defaultValue ? "" : "border-2 border-dashed"} rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 ${errors ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 dark:border-gray-600 dark:hover:border-gray-500'}`}>
            {(!!value || !!defaultValue) ?
                <img id="preview-img" className="min-h-100 min-w-100 h-full w-full hover:opacity-75"></img>
            :
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400 tese">
                        SVG, PNG, JPG, JPEG, GIF, BMP, or WebP
                        <br />(MAX. 2000x2000px)
                    </p>
                </div>
            }
            <input id="dropzone-file" type="file" name={name} onChange={handleFile} className="hidden" />
            {(errors ?? false) && <InputError message={errors} className="mt-2" />}
        </label>
    )
}
