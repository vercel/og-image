//import { readFileSync } from 'fs';
import { ParsedRequest } from './types';
import React from 'react';

//const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
//const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
//const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');

export function Template(parsedReq: ParsedRequest) {
    const { text, fontSize, images, widths, heights } = parsedReq;
    console.log(parsedReq);
    return (
        <div>
            <div className="spacer" />
            <div className="logo-wrapper">
                {images.map((img, i) =>
                    <>
                        <PlusSign i={i} />
                        <Image src={img} width={widths[i]} height={heights[i]} />
                    </>
                )}
            </div>
            <div className="spacer" />
            <div className="heading" style={{fontSize}}>{text}</div>
        </div>
        );
}

function Image({src, width ='auto', height = '225'}: { src: string, width: string, height: string}) {
    return (<img
        className="logo"
        alt="Generated Image"
        src={src}
        width={width}
        height={height}
    />);
}

function PlusSign({ i }: { i: number }) {
    return i === 0 ? null : <div className="plus">+</div>
}
