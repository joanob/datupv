
import "./styles.scss"

interface Props {
    className: string
}

const Loader = ({ className }: Props) => {
    return (
        <div className={[className, "loader-container"].join(" ")}>
            <div className="loader">
                <div className="loader-vertical-wall"></div>
                <div className="loader-horizontal-wall"></div>
                <div className="loader-dot"></div>
                <div className="loader-signal loader-signal-1"></div>
                <div className="loader-blank loader-blank-1"></div>
                <div className="loader-signal loader-signal-2"></div>
                <div className="loader-blank loader-blank-2"></div>
                <div className="loader-signal loader-signal-3"></div>
                <div className="loader-blank loader-blank-3"></div>
            </div>
        </div>
    )
}

export default Loader