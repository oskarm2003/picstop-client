import './customButton.less'

export default function CustomButton({ text, whenClicked, loading, justText, color, text_size }:
    { text: string, whenClicked: () => void, justText?: true, color?: string, loading?: boolean, text_size?: number }) {

    let classname = 'custom-button'
    if (justText) {
        classname = 'just-text'
    }
    if (!loading) {
        classname += ' active'
    }
    else {
        classname += ' loading'
    }

    const onClick = () => {
        if (!loading) whenClicked()
    }

    return <button
        style={{
            color: color,
            textDecoration: justText ? "underline" : "none",
            fontSize: text_size ? text_size + "rem" : "1.2rem"
        }}
        className={classname}
        onClick={onClick}>

        {loading ? <div /> : text}
    </button>

}