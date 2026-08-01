const bookPattern = [
  { width: 14, height: 72, color: '#563026', lean: -2 },
  { width: 18, height: 88, color: '#223d38', lean: 0 },
  { width: 12, height: 78, color: '#786141', lean: 2 },
  { width: 22, height: 92, color: '#3b2630', lean: 0 },
  { width: 15, height: 68, color: '#73503a', lean: -4 },
  { width: 19, height: 84, color: '#293447', lean: 1 },
  { width: 13, height: 74, color: '#4a4b31', lean: 0 },
  { width: 21, height: 90, color: '#652f29', lean: 3 },
  { width: 16, height: 80, color: '#87704d', lean: 0 },
  { width: 12, height: 66, color: '#31453b', lean: -3 },
  { width: 20, height: 86, color: '#4d3040', lean: 0 },
]

export default function DecorativeBookRow({ rowIndex }) {
  const books = [...bookPattern.slice(rowIndex % 4), ...bookPattern.slice(0, rowIndex % 4)]
  return <div className="decorative-book-row">{books.map((book, index) => <span className="decorative-book" key={`${rowIndex}-${index}`} style={{ '--book-width': `${book.width}px`, '--book-height': `${book.height - (rowIndex % 3) * 3}px`, '--book-color': book.color, '--book-lean': `${book.lean}deg` }} />)}</div>
}
