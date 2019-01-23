
const ImagePreview = ({ src, onclick }) => {
    return H('a',
        { className: 'image-wrapper', href: src, onclick },
        H('img',
            { src }
        )
    );
}

const Dropdown = ({ options, value, onchange }) => {
    return H('div',
        { className: 'select-wrapper'},
        H('select',
            { onchange: e => onchange(e.target.value) },
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

const TextInput = ({ value, onchange }) => {
    return H('div',
        { className: 'input-outer-wrapper' },
        H('div',
            { className: 'input-inner-wrapper' },
            H('input',
                { type: 'text', value, onchange: e => onchange(e.target.value) }
            )
        )
    );
}

const Button = ({ label, onclick }) => {
    return H('button', { onclick }, label);
}

const Field = ({ label, input }) => {
    return H('div',
        { className: 'field' },
        H('label', { className: 'field-label' }, label),
        H('div', { className: 'field-value' }, input),
    );
}

const Toast = ({ show, message }) => {
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

const fileTypeOptions = [
    { text: 'PNG', value: 'png' },
    { text: 'JPEG', value: 'jpeg' },
];

const fontSizeOptions = Array
    .from({ length: 10 })
    .map((_, i) => i * 25)
    .filter(n => n > 0)
    .map(n => ({ text: n + 'px', value: n + 'px' }));

const markdownOptions = [
    { text: 'Plain Text', value: '0' },
    { text: 'Markdown', value: '1' },
];

const App = (props, state, setState) => {
    const { fileType = 'png', fontSize = '75px', md = '0', text = 'Hello World', images=['https://assets.zeit.co/image/upload/front/assets/design/now-black.svg'], showToast = false } = state;
    const url = new URL('https://og-image.now.sh/'); // TODO: change to './'
    url.pathname = `${text}.${fileType}`;
    url.searchParams.append('md', md);
    url.searchParams.append('fontSize', fontSize);
    for (let img of images) {
        url.searchParams.append('images', img);
    }
    return H('div',
        { className: 'split' },
        H('div',
            H(Toast, {
                message: 'Copied image URL to clipboard',
                show: showToast,
            }),
            H(Field, {
                label: 'File Type',
                input: H(Dropdown, { options: fileTypeOptions, value: fileType, onchange: val => setState({fileType: val}) })
            }),
            H(Field, {
                label: 'Font Size',
                input: H(Dropdown, { options: fontSizeOptions, value: fontSize, onchange: val => setState({fontSize: val}) })
            }),
            H(Field, {
                label: 'Text Type',
                input: H(Dropdown, { options: markdownOptions, value: md, onchange: val => setState({ md: val }) })
            }),
            H(Field, {
                label: 'Text Input',
                input: H(TextInput, { value: text, onchange: val => setState({ text: val }) })
            }),
            ...images.map((image, i) => H(Field, {
                label: `Image ${i + 1}`,
                input: H(TextInput, { value: image, onchange: val => { let clone = [...images]; clone[i] = val; setState({ images: clone }) } })
            })),
            H(Field, {
                label: `Image ${images.length + 1}`,
                input: H(Button, {
                    label: `Add Image ${images.length + 1}`,
                    onclick: () => { setState({ images: [...images, ''] }) }
                }),
            }),
        ),
        H('div',
            H(ImagePreview, {
                src: url.href,
                onclick: e => {
                    e.preventDefault();
                    const success = copee.toClipboard(url.href);
                    if (success) {
                        setState({ showToast: true });
                        setTimeout(() => setState({ showToast: false }), 3000);
                    } else {
                        window.open(url.href, '_blank');
                    }
                    return false;
                }
            })
        )
    );
};

R(H(App), document.getElementById('generated'));
