export const tabs = [
    {
        name:'样式',
        type:'facade'
    },
    {
        name:'数据',
        type:'data'
    },
    {
        name:'动画',
        type:'motion'
    }
]

export const propertyValues:any = {
    "position": ["static", "relative", "absolute", "fixed"],
    "top": ["$px"],
    "right": ["$px"],
    "bottom": ["$px"],
    "left": ["$px"],
    "width": ["$px", "%"],
    "height": ["$px", "%"],
    "min-width": ["$px"],
    "max-width": ["$px"],
    "min-height": ["$px"],
    "max-height": ["$px"],
    "display": ["block", "inline", "inline-block", "flex", "grid"],
    "color": "$color",
    "font-size": ["$px"],
    "font-family": ["arial", "helvetica", "times-new-roman"],
    "margin": ["$px"],
    "margin-top": ["$px"],
    "margin-right": ["$px"],
    "margin-bottom": ["$px"],
    "margin-left": ["$px"],
    "padding": ["$px"],
    "padding-top": ["$px"],
    "padding-right": ["$px"],
    "padding-bottom": ["$px"],
    "padding-left": ["$px"],
    "border": ["$text"],
    "border-bottom": ["$text"],
    "border-top": ["$text"],
    "border-left": ["$text"],
    "border-right": ["$text"],
    "background-color": ["$color"],
    "background-image": ["url($value)"],
    "text-align": ["left", "right", "center"],
    "text-overflow": ["clip", "ellipsis"],
    "line-height": ["$px"],
    "opacity": ["0.5", "1"],
    "visibility": ["visible", "hidden"],
    "float": ["left", "right", "none"],
    "overflow": ["visible", "hidden", "scroll", "auto"],
    "overflow-x": ["visible", "hidden", "scroll", "auto"],
    "overflow-y": ["visible", "hidden", "scroll", "auto"],
    "text-decoration": ["underline", "none"],
    "font-weight": ["bold", "normal"],
    "letter-spacing": ["$px"],
    "word-spacing": ["$px"],
    "text-transform": ["uppercase", "lowercase", "capitalize"],
    "list-style-type": ["disc", "circle", "square"],
    "z-index": ["$value"],
    "flex": ["$value"],
    "flex-grow": ["$value"],
    "flex-shrink": ["$value"],
    "flex-basis": ["$px", "$value"],
    "flex-flow": ["row", "row-reverse", "column", "column-reverse"],
    "justify-content": ["flex-start", "flex-end", "center", "space-between", "space-around"],
    "align-items": ["stretch", "flex-start", "flex-end", "center", "baseline"],
    "align-content": ["flex-start", "flex-end", "center", "space-between", "space-around", "stretch"],
    "flex-direction": ["row", "column"],
    "flex-wrap": ["nowrap", "wrap", "wrap-reverse"],
    "align-self": ["auto", "flex-start", "flex-end", "center", "baseline", "stretch"],
    "order": ["$value"],
    "grid-template-columns": ["grid-template-columns: repeat($value, $px) / $px $px"],
    "grid-template-rows": ["grid-template-rows: repeat($value, $px) / $px $px"],
    "grid-gap": ["$px"],
    "transform": ["translate($px, $px)", "rotate($value-deg)", "scale($value)", "skew($value-deg, $value-deg)"],
    "transition": ["transition: property $value s ease", "transition: all $value s ease"],
    "animation": ["animation-name: $value", "animation-duration: $value s"],
    "box-sizing": ["border-box", "content-box"],
    "cursor": ["default", "pointer", "crosshair", "move", "wait"],
    "outline": ["solid $px $color", "dashed $px $color"],
    "white-space": ["normal", "nowrap", "pre", "pre-wrap", "pre-line"],
    "vertical-align": ["baseline", "middle", "top", "bottom"],
    "background-repeat": ["repeat", "repeat-x", "repeat-y", "no-repeat"],
    "background-position": ["top-left", "top-center", "top-right", "center-left", "center", "center-right", "bottom-left", "bottom-center", "bottom-right", "$px $px"],
    "background-size": ["auto", "cover", "contain", "$px $px"],
    "border-radius": ["$px"],
    "box-shadow": ["$px $px $px $color", "0 0 $px $color"],
    "text-indent": ["$px"],
    "line-break": ["auto", "loose", "strict"],
    "tab-size": ["$value"],
    "user-select": ["none", "auto"],
    "pointer-events": ["auto", "none"],
    "resize": ["none", "both", "horizontal", "vertical"],
    "aspect-ratio": ["$value"],
    "object-fit": ["fill", "contain", "cover", "none", "scale-down"],
    "clip-path": ["$value"],
    "filter": ["blur($px)", "brightness($value)", "contrast($value)", "grayscale($value)", "hue-rotate($value-deg)", "invert($value)", "opacity($value)", "saturate($value)", "sepia($value)"],
    "backdrop-filter": ["blur($px)", "brightness($value)", "contrast($value)", "grayscale($value)", "hue-rotate($value-deg)", "invert($value)", "opacity($value)", "saturate($value)", "sepia($value)"],
    "perspective": ["$px"],
    "perspective-origin": ["$px $px", "top", "bottom", "left", "right", "center"],
    "transform-origin": ["$px $px", "top", "bottom", "left", "right", "center"],
    "transform-style": ["flat", "preserve-3d"],
    "will-change": ["auto", "scroll-position", "contents", "transform"],
    "scroll-behavior": ["smooth", "auto"],
    "scrollbar-track-color": ["$color"],
    "scrollbar-thumb-color": ["$color"],
    "scrollbar-face-color": ["$color"],
    "scrollbar-highlight-color": ["$color"],
    "scrollbar-shadow-color": ["$color"],
    "scrollbar-3dlight-color": ["$color"],
    "scrollbar-darkshadow-color": ["$color"],
    "writing-mode": ["horizontal-tb", "vertical-rl", "vertical-lr"],
    "direction": ["ltr", "rtl"],
    "unicode-bidi": ["normal", "embed", "bidi-override"],
    "columns": ["$value"],
    "column-count": ["$value"],
    "column-gap": ["$px"],
    "column-rule": ["solid $px $color", "dashed $px $color"],
    "column-span": ["$value"],
    "column-width": ["$px"],
    "content": ["$value"]
}

type PropertyClasssify = {
    [key: string]: string[]
}
export const propertyClassify:PropertyClasssify = {
    "文本样式类": ["color", "font-size", "font-family", "text-align", "text-overflow", "line-height", "opacity", "visibility", "text-decoration", "font-weight", "letter-spacing", "word-spacing", "text-transform", "list-style-type"],
    "颜色背景类":[
        "background",
        "background-color",
        "background-image",
        "background-repeat",
        "background-position",
        "background-size",
        "background-attachment",
        "background-clip",
        "background-origin",
        "background-blend-mode"
    ],
    "布局定位类": ["position", "top", "right", "bottom", "left", "width", "height", "min-width", "max-width", "min-height", "max-height", "display", "margin", "margin-top", "margin-right", "margin-bottom", "margin-left", "padding", "padding-top", "padding-right", "padding-bottom", "padding-left", "border", "border-bottom", "border-top", "border-left", "border-right", "z-index", "flex", "flex-grow", "flex-shrink", "flex-basis", "flex-flow", "justify-content", "align-items", "align-content", "flex-direction", "flex-wrap", "align-self", "order", "grid-template-columns", "grid-template-rows", "grid-gap", "transform", "transition", "animation", "box-sizing", "cursor", "outline", "white-space", "vertical-align", "background-repeat", "background-position", "background-size", "border-radius", "box-shadow", "text-indent", "line-break", "tab-size", "user-select", "pointer-events", "resize", "aspect-ratio", "object-fit", "clip-path", "filter", "backdrop-filter", "perspective", "perspective-origin", "transform-origin", "transform-style", "will-change", "scroll-behavior", "scrollbar-track-color", "scrollbar-thumb-color", "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color", "scrollbar-3dlight-color", "scrollbar-darkshadow-color", "writing-mode", "direction", "unicode-bidi", "columns", "column-count", "column-gap", "column-rule", "column-span", "column-width", "content"],
}