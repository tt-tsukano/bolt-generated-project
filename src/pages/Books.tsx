import { useState } from 'react';
import {
  Table,
  Button,
  Group,
  TextInput,
  Modal,
  Stack,
  Title,
  Box,
} from '@mantine/core';
import { useBookStore } from '../store/bookStore';
import { useAuthStore } from '../store/authStore';
import { Book } from '../types';

export function Books() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
  });

  const { books, addBook, deleteBook, borrowBook, returnBook } = useBookStore();
  const user = useAuthStore((state) => state.user);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.isbn.includes(search)
  );

  const handleAddBook = () => {
    addBook({
      ...newBook,
      status: 'available',
    });
    setNewBook({ title: '', author: '', isbn: '' });
    setIsModalOpen(false);
  };

  return (
    <Box p={20}>
      <Group position="apart" mb={20}>
        <Title order={1}>Library Management System</Title>
        <Button onClick={() => setIsModalOpen(true)}>Add Book</Button>
      </Group>

      <TextInput
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        mb={20}
      />

      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.status}</td>
              <td>
                <Group spacing={8}>
                  {book.status === 'available' ? (
                    <Button
                      size="xs"
                      onClick={() => borrowBook(book.id, user?.id || '')}
                    >
                      Borrow
                    </Button>
                  ) : (
                    <Button size="xs" onClick={() => returnBook(book.id)}>
                      Return
                    </Button>
                  )}
                  <Button
                    size="xs"
                    color="red"
                    onClick={() => deleteBook(book.id)}
                  >
                    Delete
                  </Button>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Book"
      >
        <Stack>
          <TextInput
            label="Title"
            value={newBook.title}
            onChange={(e) =>
              setNewBook({ ...newBook, title: e.target.value })
            }
          />
          <TextInput
            label="Author"
            value={newBook.author}
            onChange={(e) =>
              setNewBook({ ...newBook, author: e.target.value })
            }
          />
          <TextInput
            label="ISBN"
            value={newBook.isbn}
            onChange={(e) =>
              setNewBook({ ...newBook, isbn: e.target.value })
            }
          />
          <Button onClick={handleAddBook}>Add Book</Button>
        </Stack>
      </Modal>
    </Box>
  );
}
