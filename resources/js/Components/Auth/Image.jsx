import React from "react";

export default function Image({src = '', alt = '', darkMode = false}) {
    return darkMode ?
    <img
        aria-hidden="true"
        className="hidden object-cover w-full h-full dark:block"
        src={src}
        alt={alt}
    /> :
    <img
        aria-hidden="true"
        className="object-cover w-full h-full dark:hidden"
        src={src}
        alt={alt}
    />
}
