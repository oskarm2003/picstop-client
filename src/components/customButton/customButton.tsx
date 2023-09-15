import './customButton.less'

export default function CustomButton({ text, whenClicked, justText, color }:
    { text: string, whenClicked: () => void, justText?: true, color?: string }) {

    return <button style={{ color: color }} className={justText ? "just-text" : "custom-button"} onClick={whenClicked}>{text}</button>

}