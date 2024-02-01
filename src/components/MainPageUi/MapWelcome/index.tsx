import { FaAngleLeft } from "react-icons/fa6"

const MapView = () => {
    return (
        <div style={{
            backdropFilter: 'blur(10px)',
            backgroundColor: "rgb(0,0,0,0.05)",
            width: '60vw',
            height: '30vh',
            color: 'black',
            position: 'absolute',
            zIndex: 999,
            top: '22%',
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: '25px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div className="music-bottom" style={{ width: 40, height: 40, marginLeft: '-20px', border: '2px solid rgb(163, 163, 163, 0.5)' }}>
                <FaAngleLeft color="white" />
            </div>
            <div className="music-bottom" style={{ width: 40, height: 40, marginLeft: '-20px', border: '2px solid rgb(163, 163, 163, 0.5)', rotate: '180deg' }}>
                <FaAngleLeft color="white" />
            </div>
        </div>
    )
}
export default MapView