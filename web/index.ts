import { ParsedRequest } from '../api/_lib/types';
const { H, R } = (window as any);
let timeout = -1;

interface ImagePreviewProps {
    src: string;
    onclick: () => void;
    onload: () => void;
    onerror: () => void;
    loading: boolean;
}

const ImagePreview = ({ src, onclick, onload, onerror, loading }: ImagePreviewProps) => {
    const style = {
        filter: loading ? 'blur(5px)' : '',
        opacity: loading ? 0.1 : 1,
    };
    const title = 'Click to copy image URL to clipboard';
    return H('a',
        { className: 'image-wrapper', href: src, onclick },
        H('img',
            { src, onload, onerror, style, title }
        )
    );
}

interface DropdownOption {
    text: string;
    value: string;
}

interface DropdownProps {
    options: DropdownOption[];
    value: string;
    onchange: (val: string) => void;
    small: boolean;
}

const Dropdown = ({ options, value, onchange, small }: DropdownProps) => {
    const wrapper = small ? 'select-wrapper small' : 'select-wrapper';
    const arrow = small ? 'select-arrow small' : 'select-arrow';
    return H('div',
        { className: wrapper },
        H('select',
            { onchange: (e: any) => onchange(e.target.value) },
            options.map(o =>
                H('option',
                    { value: o.value, selected: value === o.value },
                    o.text
                )
            )
        ),
        H('div',
            { className: arrow },
            '▼'
        )
    );
}

// interface TextInputProps {
//     value: string;
//     oninput: (val: string) => void;
// }

// const TextInput = ({ value, oninput }: TextInputProps) => {
//     return H('div',
//         { className: 'input-outer-wrapper' },
//         H('div',
//             { className: 'input-inner-wrapper' },
//             H('input',
//                 { type: 'text', value, oninput: (e: any) => oninput(e.target.value) }
//             )
//         )
//     );
// }

// interface ButtonProps {
//     label: string;
//     onclick: () => void;
// }

// const Button = ({ label, onclick }: ButtonProps) => {
//     return H('button', { onclick }, label);
// }

interface FieldProps {
    label: string;
    input: any;
}

const Field = ({ label, input }: FieldProps) => {
    return H('div',
        { className: 'field' },
        H('label', 
            H('div', {className: 'field-label'}, label),
            H('div', { className: 'field-value' }, input),
        ),
    );
}

// interface ToastProps {
//     show: boolean;
//     message: string;
// }

// const Toast = ({ show, message }: ToastProps) => {
//     const style = { transform:  show ? 'translate3d(0,-0px,-0px) scale(1)' : '' };
//     return H('div',
//         { className: 'toast-area' },
//         H('div',
//             { className: 'toast-outer', style },
//             H('div',
//                 { className: 'toast-inner' },
//                 H('div',
//                     { className: 'toast-message'},
//                     message
//                 )
//             )
//         ),
//     );
// }

const themeOptions: DropdownOption[] = [
    { text: 'Light', value: 'light' },
    { text: 'Dark', value: 'dark' },
];

// const fileTypeOptions: DropdownOption[] = [
//     { text: 'PNG', value: 'png' },
//     { text: 'JPEG', value: 'jpeg' },
// ];

const tokenOptions = [
    { text: 'ETH', value: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' },
    { text: 'USDC', value: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' },
    { text: 'WETH', value: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' },
    { text: 'DAI', value: '0x6b175474e89094c44da98b954eedeac495271d0f' },
]

const chainIds = [
    { text: 'Mainnet', value: 1 },
    { text: 'BSC', value: 56 },
    { text: 'Ropsten', value: 3 },
    { text: 'Polygon', value: 137 },
]

// const widthOptions = [
//     { text: 'width', value: 'auto' },
//     { text: '50', value: '50' },
//     { text: '100', value: '100' },
//     { text: '150', value: '150' },
//     { text: '200', value: '200' },
//     { text: '250', value: '250' },
//     { text: '300', value: '300' },
//     { text: '350', value: '350' },
// ];

// const heightOptions = [
//     { text: 'height', value: 'auto' },
//     { text: '50', value: '50' },
//     { text: '100', value: '100' },
//     { text: '150', value: '150' },
//     { text: '200', value: '200' },
//     { text: '250', value: '250' },
//     { text: '300', value: '300' },
//     { text: '350', value: '350' },
// ];

interface AppState extends ParsedRequest {
    loading: boolean;
    overrideUrl: URL | null;
    baseToken: string;
    quoteToken: string;
    chainId: number;
}

type SetState = (state: Partial<AppState>) => void;

const App = (_: any, state: AppState, setState: SetState) => {
    const setLoadingState = (newState: Partial<AppState>) => {
        window.clearTimeout(timeout);
        if (state.overrideUrl && state.overrideUrl !== newState.overrideUrl) {
            newState.overrideUrl = state.overrideUrl;
        }
        if (newState.overrideUrl) {
            timeout = window.setTimeout(() => setState({ overrideUrl: null }), 200);
        }

        setState({ ...newState, loading: true });
    };
    const {
        theme = 'light',
        baseTokenSymbol = 'ETH',
        quoteTokenSymbol = 'DAI',
        baseTokenAddr = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        quoteTokenAddr = '0x6b175474e89094c44da98b954eedeac495271d0f',
        chainId = 1,
    } = state;
    // const imageOptions = theme === 'light' ? imageLightOptions : imageDarkOptions;
    const url = new URL(window.location.origin);
    url.pathname = `${encodeURIComponent(baseTokenSymbol)}-${encodeURIComponent(quoteTokenSymbol)}.png`;
    url.searchParams.append('theme', theme);
    url.searchParams.append('baseTokenSymbol', baseTokenSymbol);
    url.searchParams.append('quoteTokenSymbol', quoteTokenSymbol);
    url.searchParams.append('baseTokenAddr', baseTokenAddr);
    url.searchParams.append('quoteTokenAddr', quoteTokenAddr);
    url.searchParams.append('chainId', `${chainId}`);

    return H('div',
        { className: 'split' },
        H('div',
            { className: 'pull-left' },
            H('div',
                H(Field, {
                    label: 'Theme',
                    input: H(Dropdown, {
                        options: themeOptions,
                        value: theme,
                    })
                }),
                H(Field, {
                    label: 'Base Token Address',
                    input: H(Dropdown, {
                        options: tokenOptions,
                        value: baseTokenAddr,
                        onchange: (val: string) => setLoadingState({ baseTokenAddr: val })
                    })
                }),
                H(Field, {
                    label: 'Quote Token',
                    input: H(Dropdown, {
                        options: tokenOptions,
                        value: quoteTokenAddr,
                        onchange: (val: string) => setLoadingState({ quoteTokenAddr: val })
                    })
                }),
                H(Field, {
                    label: 'Chain',
                    input: H(Dropdown, {
                        options: chainIds,
                        value: chainId,
                        onchange: (val: number) => setLoadingState({ chainId: val })
                    })
                }),
                // H(Field, {
                //     label: 'Text Input',
                //     input: H(TextInput, {
                //         value: text,
                //         oninput: (val: string) => {
                //             console.log('oninput ' + val);
                //             setLoadingState({ text: val, overrideUrl: url });
                //         }
                //     })
                // }),
                // H(Field, {
                //     label: 'Image 1',
                //     input: H('div',
                //         H(Dropdown, {
                //             options: imageOptions,
                //             value: imageOptions[selectedImageIndex].value,
                //             onchange: (val: string) =>  {
                //                 let clone = [...images];
                //                 clone[0] = val;
                //                 const selected = imageOptions.map(o => o.value).indexOf(val);
                //                 setLoadingState({ images: clone, selectedImageIndex: selected });
                //             }
                //         }),
                //         H('div',
                //             { className: 'field-flex' },
                //             H(Dropdown, {
                //                 options: widthOptions,
                //                 value: widths[0],
                //                 small: true,
                //                 onchange: (val: string) =>  {
                //                     let clone = [...widths];
                //                     clone[0] = val;
                //                     setLoadingState({ widths: clone });
                //                 }
                //             }),
                //             H(Dropdown, {
                //                 options: heightOptions,
                //                 value: heights[0],
                //                 small: true,
                //                 onchange: (val: string) =>  {
                //                     let clone = [...heights];
                //                     clone[0] = val;
                //                     setLoadingState({ heights: clone });
                //                 }
                //             })
                //         )
                //     ),
                // }),
                // ...images.slice(1).map((image, i) => H(Field, {
                //     label: `Image ${i + 2}`,
                //     input: H('div',
                //         H(TextInput, {
                //             value: image,
                //             oninput: (val: string) => {
                //                 let clone = [...images];
                //                 clone[i + 1] = val;
                //                 setLoadingState({ images: clone, overrideUrl: url });
                //             }
                //         }),
                //         H('div',
                //             { className: 'field-flex' },
                //             H(Dropdown, {
                //                 options: widthOptions,
                //                 value: widths[i + 1],
                //                 small: true,
                //                 onchange: (val: string) =>  {
                //                     let clone = [...widths];
                //                     clone[i + 1] = val;
                //                     setLoadingState({ widths: clone });
                //                 }
                //             }),
                //             H(Dropdown, {
                //                 options: heightOptions,
                //                 value: heights[i + 1],
                //                 small: true,
                //                 onchange: (val: string) =>  {
                //                     let clone = [...heights];
                //                     clone[i + 1] = val;
                //                     setLoadingState({ heights: clone });
                //                 }
                //             })
                //         ),
                //         H('div',
                //             { className: 'field-flex' },
                //             H(Button, {
                //                 label: `Remove Image ${i + 2}`,
                //                 onclick: (e: MouseEvent) => {
                //                     e.preventDefault();
                //                     const filter = (arr: any[]) => [...arr].filter((_, n) => n !== i + 1);
                //                     const imagesClone = filter(images);
                //                     const widthsClone = filter(widths);
                //                     const heightsClone = filter(heights);
                //                     setLoadingState({ images: imagesClone, widths: widthsClone, heights: heightsClone });
                //                 }
                //             })
                //         )
                //     )
                // })),
                // H(Field, {
                //     label: `Image ${images.length + 1}`,
                //     input: H(Button, {
                //         label: `Add Image ${images.length + 1}`,
                //         onclick: () => {
                //             const nextImage = images.length === 1
                //                 ? 'https://cdn.jsdelivr.net/gh/remojansen/logo.ts@master/ts.svg'
                //                 : '';
                //             setLoadingState({ images: [...images, nextImage] })
                //         }
                //     }),
                // }),
            )
        ),
        H('div',
            { className: 'pull-right' },
            H(ImagePreview, {
                src: state.overrideUrl ? state.overrideUrl.href : url.href,
                
            })
        ),
        // H(Toast, {
        //     message: messageToast,
        //     show: showToast,
        // })
    );
};

R(H(App), document.getElementById('app'));
