import './customButton.less'

export default function CustomButton({ text, whenClicked, loading, justText, color }:
    { text: string, whenClicked: () => void, justText?: true, color?: string, loading?: boolean }) {

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
        style={{ color: color }}
        className={classname}
        onClick={onClick}>

        {loading ? <div /> : text}
    </button>

}