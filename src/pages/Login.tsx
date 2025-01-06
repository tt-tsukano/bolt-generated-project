import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput, PasswordInput, Button, Box, Title } from '@mantine/core';
import { useAuthStore } from '../store/authStore';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    navigate('/');
  };

  return (
    <Box sx={{ maxWidth: 400 }} mx="auto" mt={40}>
      <Title order={1} mb={30}>
        Library Management System
      </Title>
      <form onSubmit={handleSubmit}>
        <TextInput
          required
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb={16}
        />
        <PasswordInput
          required
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb={16}
        />
        <Button type="submit" fullWidth>
          Login
        </Button>
      </form>
    </Box>
  );
}
