import { create } from 'zustand';
import { Book } from '../types';

interface BookState {
  books: Book[];
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  borrowBook: (bookId: string, userId: string) => void;
  returnBook: (bookId: string) => void;
}

export const useBookStore = create<BookState>((set, get) => ({
  books: [],
  addBook: (book) => {
    const newBook: Book = {
      ...book,
      id: Date.now().toString(),
      status: 'available',
    };
    set((state) => ({ books: [...state.books, newBook] }));
  },
  updateBook: (id, book) => {
    set((state) => ({
      books: state.books.map((b) => (b.id === id ? { ...b, ...book } : b)),
    }));
  },
  deleteBook: (id) => {
    set((state) => ({
      books: state.books.filter((b) => b.id !== id),
    }));
  },
  borrowBook: (bookId, userId) => {
    set((state) => ({
      books: state.books.map((b) =>
        b.id === bookId
          ? {
              ...b,
              status: 'borrowed',
              borrowedBy: userId,
              borrowedAt: new Date().toISOString(),
              dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            }
          : b
      ),
    }));
  },
  returnBook: (bookId) => {
    set((state) => ({
      books: state.books.map((b) =>
        b.id === bookId
          ? {
              ...b,
              status: 'available',
              borrowedBy: undefined,
              borrowedAt: undefined,
              dueDate: undefined,
            }
          : b
      ),
    }));
  },
}));
