import DecorativeBookRow from './DecorativeBookRow'

export default function DecorativeShelf({ side }) {
  return <div className={`decorative-shelf decorative-shelf-${side}`} aria-hidden="true"><div className="shelf-crown" />{Array.from({ length: 6 }, (_, index) => <DecorativeBookRow rowIndex={index + (side === 'right' ? 2 : 0)} key={index} />)}{side === 'right' && <div className="library-ladder" />}</div>
}
