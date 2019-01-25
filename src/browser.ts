const nowBlack = 'https://assets.zeit.co/image/upload/front/assets/design/now-black.svg';
const nowWhite = 'https://assets.zeit.co/image/upload/front/assets/design/now-white.svg';

const { H, R, copee } = (window as any);

function debounce(func: Function, wait: number) {
	var timeout = -1;
	return function(this: any, ...args: any[]) {
		var context = this;
		var later = function() {
			timeout = -1;
			func.apply(context, args);
		};
		window.clearTimeout(timeout);
		timeout = window.setTimeout(later, wait);
	};
};

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
    return H('a',
        { className: 'image-wrapper', href: src, onclick },
        H('img',
            { src, onload, onerror, style }
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
}

const Dropdown = ({ options, value, onchange }: DropdownProps) => {
    return H('div',
        { className: 'select-wrapper'},
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
            { className: 'select-arrow' },
            '▼'
        )
    );
}

interface TextInputProps {
    value: string;
    oninput: (val: string) => void;
}

const TextInput = ({ value, oninput }: TextInputProps) => {
    return H('div',
        { className: 'input-outer-wrapper' },
        H('div',
            { className: 'input-inner-wrapper' },
            H('input',
                { type: 'text', value, oninput: (e: any) => oninput(e.target.value) }
            )
        )
    );
}

interface ButtonProps {
    label: string;
    onclick: () => void;
}

const Button = ({ label, onclick }: ButtonProps) => {
    return H('button', { onclick }, label);
}

interface FieldProps {
    label: string;
    input: any;
}

const Field = ({ label, input }: FieldProps) => {
    return H('div',
        { className: 'field' },
        H('label', { className: 'field-label' }, label),
        H('div', { className: 'field-value' }, input),
    );
}

interface ToastProps {
    show: boolean;
    message: string;
}

const Toast = ({ show, message }: ToastProps) => {
    const style = { transform:  show ? 'translate3d(0,-0px,-0px) scale(1)' : '' };
    return H('div',
        { className: 'toast-area' },
        H('div',
            { className: 'toast-outer', style },
            H('div',
                { className: 'toast-inner' },
                H('div',
                    { className: 'toast-message'},
                    message
                )
            )
        ),
    );
}

const themeOptions: DropdownOption[] = [
    { text: 'Light', value: 'light' },
    { text: 'Dark', value: 'dark' },
];

const fileTypeOptions: DropdownOption[] = [
    { text: 'PNG', value: 'png' },
    { text: 'JPEG', value: 'jpeg' },
];

const fontSizeOptions: DropdownOption[] = Array
    .from({ length: 10 })
    .map((_, i) => i * 25)
    .filter(n => n > 0)
    .map(n => ({ text: n + 'px', value: n + 'px' }));

const markdownOptions: DropdownOption[] = [
    { text: 'Plain Text', value: '0' },
    { text: 'Markdown', value: '1' },
];

const imageLightOptions: DropdownOption[] = [
    { text: 'Now', value: 'https://assets.zeit.co/image/upload/front/assets/design/now-black.svg' },
    { text: 'ZEIT', value: 'https://assets.zeit.co/image/upload/front/assets/design/zeit-black-triangle.svg' },
    { text: 'Next.js', value: 'https://assets.zeit.co/image/upload/front/assets/design/nextjs-black-logo.svg' },
    { text: 'Hyper', value: 'https://assets.zeit.co/image/upload/front/assets/design/hyper-color-logo.svg' },
];

const imageDarkOptions: DropdownOption[] = [
    { text: 'Now', value: 'https://assets.zeit.co/image/upload/front/assets/design/now-white.svg' },
    { text: 'ZEIT', value: 'https://assets.zeit.co/image/upload/front/assets/design/zeit-white-triangle.svg' },
    { text: 'Next.js', value: 'https://assets.zeit.co/image/upload/front/assets/design/nextjs-white-logo.svg' },
    { text: 'Hyper', value: 'https://assets.zeit.co/image/upload/front/assets/design/hyper-bw-logo.svg' },
];

interface AppState extends ParsedRequest {
    loading: boolean;
    showToast: boolean;
    messageToast: string;
    selectedImageIndex: number;
}

type SetState = (state: Partial<AppState>) => void;

const App = (_: any, state: AppState, setState: SetState) => {
    const setLoadingState = (newState: Partial<AppState>) => {
        setState({ ...newState, loading: true });
    };
    const {
        fileType = 'png',
        fontSize = '75px',
        theme = 'light',
        md = true,
        text = '**Hello** World',
        images=[nowBlack],
        showToast = false,
        messageToast = '',
        loading = true,
        selectedImageIndex = 0,
    } = state;
    const mdValue = md ? '1' : '0';
    const imageOptions = theme === 'light' ? imageLightOptions : imageDarkOptions;
    const url = new URL(window.location.hostname === 'localhost' ? 'https://og-image.now.sh' : window.location.origin);
    url.pathname = `${encodeURIComponent(text)}.${fileType}`;
    url.searchParams.append('theme', theme);
    url.searchParams.append('md', mdValue);
    url.searchParams.append('fontSize', fontSize);
    for (let image of images) {
        url.searchParams.append('images', image);
    }
    
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
                        onchange: (val: Theme) => {
                            if (images[0] === nowBlack && val === 'dark') {
                                images[0] = nowWhite;
                            } else if (images[0] === nowWhite && val === 'light') {
                                images[0] = nowBlack;
                            }
                            setLoadingState({ theme: val, images: [...images] });
                        }
                    })
                }),
                H(Field, {
                    label: 'File Type',
                    input: H(Dropdown, {
                        options: fileTypeOptions,
                        value: fileType,
                        onchange: (val: FileType) => setLoadingState({ fileType: val })
                    })
                }),
                H(Field, {
                    label: 'Font Size',
                    input: H(Dropdown, {
                        options: fontSizeOptions,
                        value: fontSize,
                        onchange: (val: string) => setLoadingState({ fontSize: val })
                    })
                }),
                H(Field, {
                    label: 'Text Type',
                    input: H(Dropdown, {
                        options: markdownOptions,
                        value: mdValue,
                        onchange: (val: string) => setLoadingState({ md: val === '1' })
                    })
                }),
                H(Field, {
                    label: 'Text Input',
                    input: H(TextInput, {
                        value: text,
                        oninput: debounce((val: string) => {
                            setLoadingState({ text: val });
                        }, 150)
                    })
                }),
                H(Field, {
                    label: 'Image 1',
                    input: H(Dropdown, {
                        options: imageOptions,
                        value: imageOptions[selectedImageIndex].value,
                        onchange: (val: string) =>  {
                            let clone = [...images];
                            clone[0] = val;
                            setLoadingState({ images: clone });
                            const selected = imageOptions.map(o => o.value).indexOf(val);
                            setLoadingState({ images: clone, selectedImageIndex: selected });
                        }
                    })
                }),
                ...images.slice(1).map((image, i) => H(Field, {
                    label: `Image ${i + 2}`,
                    input: H(TextInput, {
                        value: image,
                        oninput: debounce((val: string) => {
                            let clone = [...images];
                            clone[i + 1] = val;
                            setLoadingState({ images: clone });
                        }, 150)
                    })
                })),
                H(Field, {
                    label: `Image ${images.length + 1}`,
                    input: H(Button, {
                        label: `Add Image ${images.length + 1}`,
                        onclick: () => {
                            const nextImage = images.length === 1
                                ? 'https://cdn.jsdelivr.net/gh/remojansen/logo.ts@master/ts.svg'
                                : '';
                            setLoadingState({ images: [...images, nextImage] })
                        }
                    }),
                }),
            )
        ),
        H('div',
            { clasName: 'pull-right' },
            H(ImagePreview, {
                src: url.href,
                loading: loading,
                onload: () => setState({ loading: false }),
                onerror: () => {
                    setState({ showToast: true, messageToast: 'Oops, an error occurred' });
                    setTimeout(() => setState({ showToast: false }), 2000);
                },
                onclick: (e: Event) => {
                    e.preventDefault();
                    const success = copee.toClipboard(url.href);
                    if (success) {
                        setState({ showToast: true, messageToast: 'Copied image URL to clipboard' });
                        setTimeout(() => setState({ showToast: false }), 3000);
                    } else {
                        window.open(url.href, '_blank');
                    }
                    return false;
                }
            })
        ),
        H(Toast, {
            message: messageToast,
            show: showToast,
        })
    );
};

R(H(App), document.getElementById('generated'));
