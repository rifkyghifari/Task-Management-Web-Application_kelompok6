import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../components/TaskForm';

describe('TaskForm', () => {
  const onSubmit = jest.fn();
  const onCancel = jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
    onCancel.mockClear();
  });

  test('form kosong saat tidak editing', () => {
    render(<TaskForm onSubmit={onSubmit} editingTask={null} onCancel={onCancel} />);
    expect(screen.getByLabelText(/Task Title/i)).toHaveValue('');
    expect(screen.getByText(/Add Task/i)).toBeInTheDocument();
  });

  test('validasi title kosong memicu alert dan tidak submit', () => {
    window.alert = jest.fn();
    render(<TaskForm onSubmit={onSubmit} editingTask={null} onCancel={onCancel} />);
    fireEvent.click(screen.getByText(/Add Task/i));
    expect(window.alert).toHaveBeenCalledWith('Please enter a task title');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('pemanggilan onSubmit dengan data form', () => {
    render(<TaskForm onSubmit={onSubmit} editingTask={null} onCancel={onCancel} />);
    fireEvent.change(screen.getByLabelText(/Task Title/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Priority/i), { target: { value: 'high' } });
    fireEvent.click(screen.getByText(/Add Task/i));
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Test', priority: 'high' })
    );
  });
});