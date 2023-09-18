import './loading.less'

export default function Loading({ color, size }: { color: string, size: number }) {

    return <div className="loading">
        <div style={{ backgroundColor: color, width: size + 'rem' }}></div>
        <div style={{ backgroundColor: color, width: size + 'rem' }}></div>
        <div style={{ backgroundColor: color, width: size + 'rem' }}></div>
    </div>

}