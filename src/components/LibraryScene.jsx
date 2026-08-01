import DecorativeShelf from './DecorativeShelf'
import '../styles/library.css'

export default function LibraryScene() {
  return <div className="library-scene" aria-hidden="true"><div className="wall-paneling" /><div className="wall-sconce sconce-left"><i /></div><div className="wall-sconce sconce-right"><i /></div><DecorativeShelf side="left" /><DecorativeShelf side="right" /><div className="library-floor"><span className="library-rug" /></div></div>
}
