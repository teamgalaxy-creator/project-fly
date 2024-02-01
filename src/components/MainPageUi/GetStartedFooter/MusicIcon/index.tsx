import { FaItunesNote, FaPlay } from "react-icons/fa6"
import '../style.css'
const MusicIcon = ()=>{
    return(
        <div className="music-bottom" >
        <FaItunesNote size={20} color='#fff' />
        <FaPlay size={20} color='white' />
      </div>
    )
}
export default MusicIcon