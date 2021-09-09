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

const themeOptions: DropdownOption[] = [
    { text: 'Light', value: 'light' },
    { text: 'Dark', value: 'dark' },
];

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
            )
        ),
        H('div',
            { className: 'pull-right' },
            H(ImagePreview, {
                src: state.overrideUrl ? state.overrideUrl.href : url.href,
                
            })
        ),
    );
};

R(H(App), document.getElementById('app'));
