import { ParsedRequest, Theme, FileType } from "../api/_lib/types";
const { H, R, copee } = window as any;
let timeout = -1;

interface ImagePreviewProps {
  src: string;
  onclick: () => void;
  onload: () => void;
  onerror: () => void;
  loading: boolean;
}

const ImagePreview = ({
  src,
  onclick,
  onload,
  onerror,
  loading,
}: ImagePreviewProps) => {
  const style = {
    filter: loading ? "blur(5px)" : "",
    opacity: loading ? 0.1 : 1,
  };
  const title = "Click to copy image URL to clipboard";
  return H(
    "a",
    { className: "image-wrapper", href: src, onclick },
    H("img", { src, onload, onerror, style, title })
  );
};

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
  const wrapper = small ? "select-wrapper small" : "select-wrapper";
  const arrow = small ? "select-arrow small" : "select-arrow";
  return H(
    "div",
    { className: wrapper },
    H(
      "select",
      { onchange: (e: any) => onchange(e.target.value) },
      options.map((o) =>
        H("option", { value: o.value, selected: value === o.value }, o.text)
      )
    ),
    H("div", { className: arrow }, "▼")
  );
};

interface TextInputProps {
  value: string;
  oninput: (val: string) => void;
}

const TextInput = ({ value, oninput }: TextInputProps) => {
  return H(
    "div",
    { className: "input-outer-wrapper" },
    H(
      "div",
      { className: "input-inner-wrapper" },
      H("input", {
        type: "text",
        value,
        oninput: (e: any) => oninput(e.target.value),
      })
    )
  );
};

interface FieldProps {
  label: string;
  input: any;
}

const Field = ({ label, input }: FieldProps) => {
  return H(
    "div",
    { className: "field" },
    H(
      "label",
      H("div", { className: "field-label" }, label),
      H("div", { className: "field-value" }, input)
    )
  );
};

interface ToastProps {
  show: boolean;
  message: string;
}

const Toast = ({ show, message }: ToastProps) => {
  const style = { transform: show ? "translate3d(0,-0px,-0px) scale(1)" : "" };
  return H(
    "div",
    { className: "toast-area" },
    H(
      "div",
      { className: "toast-outer", style },
      H(
        "div",
        { className: "toast-inner" },
        H("div", { className: "toast-message" }, message)
      )
    )
  );
};

const themeOptions: DropdownOption[] = [
  { text: "Light", value: "light" },
  { text: "Dark", value: "dark" },
];

const fileTypeOptions: DropdownOption[] = [
  { text: "PNG", value: "png" },
  { text: "JPEG", value: "jpeg" },
];

const fontSizeOptions: DropdownOption[] = Array.from({ length: 10 })
  .map((_, i) => i * 25)
  .filter((n) => n > 0)
  .map((n) => ({ text: n + "px", value: n + "px" }));

const imageOptions: DropdownOption[] = [
  {
    text: "Profile",
    value: "https://blog.sethcorker.com/profile-picture.jpeg",
  },
  {
    text: "Footer",
    value: "https://blog.sethcorker.com/header-image.png",
  },
];

const widthOptions = [
  { text: "width", value: "auto" },
  { text: "50", value: "50" },
  { text: "100", value: "100" },
  { text: "150", value: "150" },
  { text: "200", value: "200" },
  { text: "250", value: "250" },
  { text: "300", value: "300" },
  { text: "350", value: "350" },
];

const heightOptions = [
  { text: "height", value: "auto" },
  { text: "50", value: "50" },
  { text: "100", value: "100" },
  { text: "150", value: "150" },
  { text: "200", value: "200" },
  { text: "250", value: "250" },
  { text: "300", value: "300" },
  { text: "350", value: "350" },
];

interface AppState extends ParsedRequest {
  loading: boolean;
  showToast: boolean;
  messageToast: string;
  selectedFooterImageIndex: number;
  selectedMainImageIndex: number;
  widths: string[];
  heights: string[];
  overrideUrl: URL | null;
  kicker: string;
  title: string;
  subtitle: string;
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
    fileType = "png",
    fontSize = "150px",
    theme = "light",
    kicker = "a kicker",
    title = "A title",
    subtitle = "A subtitle",
    mainImage = imageOptions[0].value,
    mainImageWidth = widthOptions[7].value,
    mainImageHeight = widthOptions[7].value,
    footerImage = imageOptions[1].value,
    footerImageWidth = widthOptions[0].value,
    footerImageHeight = widthOptions[1].value,
    showToast = false,
    messageToast = "",
    loading = true,
    selectedMainImageIndex = 0,
    selectedFooterImageIndex = 1,
    overrideUrl = null,
  } = state;
  const url = new URL(window.location.origin);
  url.pathname = `${encodeURIComponent(title)}.${fileType}`;
  url.searchParams.append("kicker", kicker);
  url.searchParams.append("subtitle", subtitle);
  url.searchParams.append("theme", theme);
  url.searchParams.append("fontSize", fontSize);
  url.searchParams.append("mainImage", mainImage);
  url.searchParams.append("mainImageWidth", mainImageWidth);
  url.searchParams.append("mainImageHeight", mainImageHeight);
  url.searchParams.append("footerImage", footerImage);
  url.searchParams.append("footerImageWidth", footerImageWidth);
  url.searchParams.append("footerImageHeight", footerImageHeight);

  return H(
    "div",
    { className: "split" },
    H(
      "div",
      { className: "pull-left" },
      H(
        "div",
        H(Field, {
          label: "Theme",
          input: H(Dropdown, {
            options: themeOptions,
            value: theme,
            onchange: (val: Theme) => {
              let clone = mainImage;
              clone = imageOptions[selectedMainImageIndex].value;
              setLoadingState({ theme: val, mainImage: clone });
            },
          }),
        }),
        H(Field, {
          label: "File Type",
          input: H(Dropdown, {
            options: fileTypeOptions,
            value: fileType,
            onchange: (val: FileType) => setLoadingState({ fileType: val }),
          }),
        }),
        H(Field, {
          label: "Font Size",
          input: H(Dropdown, {
            options: fontSizeOptions,
            value: fontSize,
            onchange: (val: string) => setLoadingState({ fontSize: val }),
          }),
        }),
        H(Field, {
          label: "Kicker",
          input: H(TextInput, {
            value: kicker,
            oninput: (val: string) => {
              setLoadingState({ kicker: val, overrideUrl: url });
            },
          }),
        }),
        H(Field, {
          label: "Title",
          input: H(TextInput, {
            value: title,
            oninput: (val: string) => {
              setLoadingState({ title: val, overrideUrl: url });
            },
          }),
        }),
        H(Field, {
          label: "Subtitle",
          input: H(TextInput, {
            value: subtitle,
            oninput: (val: string) => {
              setLoadingState({ subtitle: val, overrideUrl: url });
            },
          }),
        }),
        H(Field, {
          label: "Main Image",
          input: H(
            "div",
            H(Dropdown, {
              options: imageOptions,
              value: imageOptions[selectedMainImageIndex].value,
              onchange: (val: string) => {
                const selected = imageOptions.map((o) => o.value).indexOf(val);
                setLoadingState({
                  mainImage: val,
                  selectedMainImageIndex: selected,
                });
              },
            }),
            H(
              "div",
              { className: "field-flex" },
              H(Dropdown, {
                options: widthOptions,
                value: mainImageWidth,
                small: true,
                onchange: (val: string) => {
                  setLoadingState({ mainImageWidth: val });
                },
              }),
              H(Dropdown, {
                options: heightOptions,
                value: mainImageHeight,
                small: true,
                onchange: (val: string) => {
                  setLoadingState({ mainImageHeight: val });
                },
              })
            )
          ),
        }),
        H(Field, {
          label: "Footer Image",
          input: H(
            "div",
            H(Dropdown, {
              options: imageOptions,
              value: imageOptions[selectedFooterImageIndex].value,
              onchange: (val: string) => {
                const selected = imageOptions.map((o) => o.value).indexOf(val);
                setLoadingState({
                  footerImage: val,
                  selectedFooterImageIndex: selected,
                });
              },
            }),
            H(
              "div",
              { className: "field-flex" },
              H(Dropdown, {
                options: widthOptions,
                value: footerImageWidth,
                small: true,
                onchange: (val: string) => {
                  setLoadingState({ footerImageWidth: val });
                },
              }),
              H(Dropdown, {
                options: heightOptions,
                value: footerImageHeight,
                small: true,
                onchange: (val: string) => {
                  setLoadingState({ footerImageHeight: val });
                },
              })
            )
          ),
        })
      )
    ),
    H(
      "div",
      { className: "pull-right" },
      H(ImagePreview, {
        src: overrideUrl ? overrideUrl.href : url.href,
        loading: loading,
        onload: () => setState({ loading: false }),
        onerror: () => {
          setState({
            showToast: true,
            messageToast: "Oops, an error occurred",
          });
          setTimeout(() => setState({ showToast: false }), 2000);
        },
        onclick: (e: Event) => {
          e.preventDefault();
          const success = copee.toClipboard(url.href);
          if (success) {
            setState({
              showToast: true,
              messageToast: "Copied image URL to clipboard",
            });
            setTimeout(() => setState({ showToast: false }), 3000);
          } else {
            window.open(url.href, "_blank");
          }
          return false;
        },
      })
    ),
    H(Toast, {
      message: messageToast,
      show: showToast,
    })
  );
};

R(H(App), document.getElementById("app"));
console.log(R);
