import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../components/TaskForm';

describe('TaskForm', () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
  });

  test('form kosong saat render awal', () => {
    render(<TaskForm onSubmit={onSubmit} />);
    expect(screen.getByLabelText(/Task Title/i)).toHaveValue('');
    expect(screen.getByText(/Add Task/i)).toBeInTheDocument();
  });

  test('validasi title kosong memicu alert dan tidak submit', () => {
    window.alert = jest.fn();
    render(<TaskForm onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText(/Add Task/i));
    expect(window.alert).toHaveBeenCalledWith('Please enter a task title');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('pemanggilan onSubmit dengan data form', () => {
    render(<TaskForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/Task Title/i), { target: { value: 'Test Task' } });
    fireEvent.change(screen.getByLabelText(/Priority/i), { target: { value: 'high' } });
    fireEvent.click(screen.getByText(/Add Task/i));
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Test Task', priority: 'high' })
    );
  });
});
