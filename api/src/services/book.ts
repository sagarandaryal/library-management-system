import Book, { BookDocument, Status } from '../models/Book'
import User from '../models/User'
import Author from '../models/Author'
import { NotFoundError } from '../helpers/apiError'

const createBook = async (book: BookDocument): Promise<BookDocument> => {
  console.log(book)
  const newBook = await book.save()
  let i
  for (i = 0; i < newBook.authors.length; i++) {
    const authorId = newBook.authors[i]
    const foundAuthor = await Author.findById(authorId)
    if (!foundAuthor) {
      throw new NotFoundError(`Author ${authorId} not found`)
    }
    foundAuthor.books.push(newBook._id)
    await foundAuthor.save()
  }
  return newBook
}

const getAllBooks = async (
  pageNum: string,
  limitNum: string
): Promise<BookDocument[]> => {
  const page = parseInt(pageNum) || 1
  const limit = parseInt(limitNum) || 10
  const skip = (page - 1) * limit
  return Book.find()
    .sort({ title: 1, publishedDate: -1 })
    .limit(limit)
    .skip(skip)
}

const getSingleBook = async (bookId: string): Promise<BookDocument | null> => {
  const foundBook = await Book.findById(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const updateBook = async (
  bookId: string,
  update: Partial<BookDocument>
): Promise<BookDocument | null> => {
  const foundBook = await Book.findByIdAndUpdate(bookId, update)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const deleteBook = async (bookId: string): Promise<BookDocument | null> => {
  const foundBook = await Book.findByIdAndDelete(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const borrowBook = async (
  bookId: string,
  userId: string
): Promise<BookDocument | null> => {
  const returnDate = new Date(new Date().getDate() + 14)

  const bookUpdate = {
    status: Status.BORROWED,
    borrowerId: userId,
    borrowDate: new Date(),
    returnDate,
  }

  const foundBook = await Book.findByIdAndUpdate(bookId, bookUpdate, {
    new: true,
  })

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  const foundUser = await User.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`Book ${userId} not found`)
  }

  if (foundUser.borrowedBooks.indexOf(bookId) == -1) {
    foundUser.borrowedBooks.push(bookId)
    await foundUser.save()
  }

  return foundBook
}

const returnBook = async (
  bookId: string,
  userId: string
): Promise<BookDocument | null> => {
  const bookUpdate = {
    $set: {
      status: Status.AVAILABLE,
    },
    $unset: {
      borrowerId: null,
      borrowDate: null,
      returnDate: null,
    },
  }

  const foundBook = await Book.findByIdAndUpdate(bookId, bookUpdate, {
    new: true,
  })

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  const foundUser = await User.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`Book ${userId} not found`)
  }

  if (foundUser.borrowedBooks.indexOf(bookId) != -1) {
    foundUser.borrowedBooks = foundUser.borrowedBooks.filter(
      (book) => book != bookId
    )
    await foundUser.save()
  }

  return foundBook
}

/* const filterBook = async (
  isbn: string,
  title: string,
  category: string,
  authors: string[],
  status: string,
  pageNum: string,
  limitNum: string
): Promise<BookDocument[]> => {
  let titleQuery = {}
  let authorQuery = {}
  let isbnQuery = {}
  let statusQuery = {}
  let categoryQuery = {}
  const andArray: any[] = []

  if (title) {
    titleQuery = { title: { $regex: `${title}`, $options: 'i' } }
    andArray.push(titleQuery)
  }
  if (authors) {
    const foundAuthors = await Author.find({
      $or: [
        {
          firstName: { $regex: `${authors}`, $options: 'i' },
        },
        {
          lastName: { $regex: `${authors}`, $options: 'i' },
        },
      ],
    })
    const authorIds = foundAuthors.map((authorDoc) => authorDoc._id)
    authorQuery = { authors: { $in: authorIds } }
    andArray.push(authorQuery)
  }
  if (isbn) {
    isbnQuery = { isbn: { $regex: `${isbn}`, $options: 'i' } }
    andArray.push(isbnQuery)
  }
  if (status) {
    statusQuery = { status: { $regex: `${status}`, $options: 'i' } }
    andArray.push(statusQuery)
  }

  if (category) {
    categoryQuery = { status: { $regex: `${status}`, $options: 'i' } }
    andArray.push(categoryQuery)
  }
  const page = parseInt(pageNum) || 1
  const limit = parseInt(limitNum) || 10
  const skip = (page - 1) * limit
  return Book.find()
    .sort({ title: 1, publishedDate: -1 })
    .limit(limit)
    .skip(skip)
} */

const searchBook = async (
  searchByKeywords: string
): Promise<BookDocument[] | null> => {
  const foundBook = await Book.find({
    $or: [
      { isbn: { $regex: searchByKeywords } },
      { title: { $regex: searchByKeywords } },
      { category: { $regex: searchByKeywords } },
      { publisher: { $regex: searchByKeywords } },
      { title: { $regex: searchByKeywords } },
    ],
  })

  if (!foundBook) {
    throw new NotFoundError(`Book with keyword ${searchByKeywords} not found`)
  }

  return foundBook
}

export default {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
  searchBook,
}
