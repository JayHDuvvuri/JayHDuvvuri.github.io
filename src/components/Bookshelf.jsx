import Book from './Book'

export default function Bookshelf({ books, label, hint }) {
  return <section className="bookcase" aria-label="Portfolio volumes"><div className="case-crown"><i /><span>{label}</span><i /></div><div className="case-interior"><div className="books">{books.map((book, index) => <Book key={book.title} book={book} index={index} />)}</div><div className="shelf-edge" /></div><p className="book-hint"><span>↳</span> {hint}</p></section>
}
