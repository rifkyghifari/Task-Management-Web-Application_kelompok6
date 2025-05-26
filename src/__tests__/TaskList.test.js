import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from '../components/TaskList';

const tasks = [
  { id: '1', title: 'A', priority: 'high', status: 'todo', createdAt: '' },
  { id: '2', title: 'B', priority: 'low', status: 'done', createdAt: '' }
];

test('menampilkan header dengan jumlah tasks', () => {
  render(<TaskList tasks={tasks} onEdit={() => {}} onDelete={() => {}} />);
  expect(screen.getByText(/Your Tasks \(2\)/i)).toBeInTheDocument();
});

test('mengelompokkan tasks berdasarkan status', () => {
  render(<TaskList tasks={tasks} onEdit={() => {}} onDelete={() => {}} />);
  expect(screen.getByText(/To Do \(1\)/i)).toBeInTheDocument();
  expect(screen.getByText(/Done \(1\)/i)).toBeInTheDocument();
  expect(screen.getByText('A')).toBeInTheDocument();
  expect(screen.getByText('B')).toBeInTheDocument();
});
