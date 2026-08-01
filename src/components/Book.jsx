import { motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Book({ book, index }) {
  const navigate = useNavigate()
  const reduced = useReducedMotion()
  return <motion.button className={`book book-${index + 1}`} onClick={() => navigate(book.path)} aria-label={`Open ${book.volume}: ${book.title}`} whileHover={reduced ? undefined : { y: -13, z: 20 }} whileTap={reduced ? undefined : { y: -5, scale: 0.99 }} transition={{ type: 'spring', stiffness: 320, damping: 24 }}><span className="book-band top" /><span className="book-ornament">✦</span><span className="book-volume">{book.volume}</span><span className="book-title">{book.title}</span><span className="book-rule" /><span className="book-initials">JD</span><span className="book-band bottom" /></motion.button>
}
