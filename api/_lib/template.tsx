import { ParsedRequest } from './types';
import React from 'react';

export function Template(parsedReq: ParsedRequest) {
    //const { text, fontSize, images, widths, heights } = parsedReq;
    console.log(parsedReq);
    return (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="1280" height="640">
    <defs>
     <linearGradient id="rainbow" x1="0" x2="0" y1="0" y2="40%" gradientUnits="userSpaceOnUse" >
       <stop stopColor="#FF5B99" offset="0%"/>
       <stop stopColor="#FF5447" offset="20%"/>
       <stop stopColor="#FF7B21" offset="40%"/>
       <stop stopColor="#EAFC37" offset="60%"/>
       <stop stopColor="#4FCB6B" offset="80%"/>
       <stop stopColor="#51F7FE" offset="100%"/> 
     </linearGradient>
   </defs>
   
    <circle cx="0" cy="0" r="1" fill="#ccc" />
    <circle cx="50" cy="0" r="1" fill="#ccc" />
    <circle cx="100" cy="0" r="1" fill="#ccc" />
    <circle cx="150" cy="0" r="1" fill="#ccc" />
    <circle cx="200" cy="0" r="1" fill="#ccc" />
    <circle cx="250" cy="0" r="1" fill="#ccc" />
    <circle cx="300" cy="0" r="1" fill="#ccc" />
    <circle cx="350" cy="0" r="1" fill="#ccc" />
    
    <circle cx="0" cy="50" r="1" fill="#ccc" />
    <circle cx="50" cy="50" r="1" fill="#ccc" />
    <circle cx="100" cy="50" r="1" fill="#ccc" />
    <circle cx="150" cy="50" r="1" fill="#ccc" />
    <circle cx="200" cy="50" r="1" fill="#ccc" />
    <circle cx="250" cy="50" r="1" fill="#ccc" />
    <circle cx="300" cy="50" r="1" fill="#ccc" />
    <circle cx="350" cy="50" r="1" fill="#ccc" />
    
    <circle cx="0" cy="100" r="1" fill="#ccc" />
    <circle cx="50" cy="100" r="1" fill="#ccc" />
    <circle cx="100" cy="100" r="1" fill="#ccc" />
    <circle cx="150" cy="100" r="1" fill="#ccc" />
    <circle cx="200" cy="100" r="1" fill="#ccc" />
    <circle cx="250" cy="100" r="1" fill="#ccc" />
    <circle cx="300" cy="100" r="1" fill="#ccc" />
    <circle cx="350" cy="100" r="1" fill="#ccc" />
    
    <circle cx="0" cy="150" r="1" fill="#ccc" />
    <circle cx="50" cy="150" r="1" fill="#ccc" />
    <circle cx="100" cy="150" r="1" fill="#ccc" />
    <circle cx="150" cy="150" r="1" fill="#ccc" />
    <circle cx="200" cy="150" r="1" fill="#ccc" />
    <circle cx="250" cy="150" r="1" fill="#ccc" />
    <circle cx="300" cy="150" r="1" fill="#ccc" />
    <circle cx="350" cy="150" r="1" fill="#ccc" />
    
    <circle cx="0" cy="200" r="1" fill="#ccc" />
    <circle cx="50" cy="200" r="1" fill="#ccc" />
    <circle cx="100" cy="200" r="1" fill="#ccc" />
    <circle cx="150" cy="200" r="1" fill="#ccc" />
    <circle cx="200" cy="200" r="1" fill="#ccc" />
    <circle cx="250" cy="200" r="1" fill="#ccc" />
    <circle cx="300" cy="200" r="1" fill="#ccc" />
    <circle cx="350" cy="200" r="1" fill="#ccc" />
    
     <path d="M141.68 16.25c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm117.14-14.5c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm-39.03 3.5c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9v-46h9zM37.59.25l36.95 64H.64l36.95-64zm92.38 5l-27.71 48-27.71-48h10.39l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10v14.8h-9v-34h9v9.2c0-5.08 5.91-9.2 13.2-9.2z"></path>
    
    <text fill="url(#rainbow)" fontFamily="Licorice">
     <tspan fontSize="30" x="100" y="125">Develop.</tspan>
     <tspan fontSize="30" x="100" dy="30">Preview.</tspan>
     <tspan fontSize="30" x="120" dy="30">Ship.</tspan>
    </text>
     
 </svg>);
}
