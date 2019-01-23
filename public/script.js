
const ImagePreview = ({ src, width, height }) => {
    const style = {
        border: '1px solid #ccc',
        borderRadius: '3px',
        boxShadow: '0 4px 4px rgba(0, 0, 0, 0.12)'
    };
    return H('img', { src, width, height, style });
}

const Dropdown = ({ options, value, onchange }) => {
    const style = { width: '120px' };
    return H('select',
        { style, onchange: e => onchange(e.target.value) },
        options.map(o =>
            H('option',
                { value: o.value, selected: value === o.value },
                o.text
            )
        )
    );
}

const TextInput = ({ value }) => {
    const style = { width: '120px' };
    return H('input', { type: 'text', value, style });
}

const Field = ({ label, input }) => {
    const styleDiv =  { margin: '20px 0px' };
    const styleLabel = { width: '100px', marginRight: '20px' };
    return H('div',
        { style: styleDiv },
        H('label', { style: styleLabel }, label),
        input
    );
}

const el = document.getElementById('generated');

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
    const { fileType = 'png', fontSize = '75px', md = '0', text = 'Hello World' } = state;
    const url = `https://og-image.now.sh/${text}.${fileType}?md=${md}&fontSize=${fontSize}`;
    return H('div',
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
            input: H(Dropdown, { options: markdownOptions, value: md, onchange: val => setState({md: val}) })
        }),
        H(Field, {
            label: 'Text Input',
            input: H(TextInput, { value: text })
        }),
        H(ImagePreview, { src: url, width: 405, height: 217, }),
        H(Field, {
            label: 'URL',
            input: H(TextInput, { value: url })
        }),
    )
};
// Render the entry point to the document body
R(H(App), el);
