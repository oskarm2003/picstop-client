import './loading.less'

export default function Loading({ color, size }: { color: string, size: number }) {

    return <div className="loading" style={{ height: size * 2 + 'rem' }}>
        <div style={{ backgroundColor: color, width: size + 'rem' }}></div>
        <div style={{ backgroundColor: color, width: size + 'rem' }}></div>
        <div style={{ backgroundColor: color, width: size + 'rem' }}></div>
    </div>

}