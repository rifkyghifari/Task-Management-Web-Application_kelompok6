import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App Integration Tests', () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.spyOn(Storage.prototype, 'getItem');
    jest.spyOn(Storage.prototype, 'setItem');
    window.confirm = jest.fn(() => true);
  });

  test('memuat task dari localStorage pada mount', () => {
    const dummy = [{ id:'1', title:'Dummy Task', description:'', priority:'medium', status:'todo', createdAt: new Date().toISOString() }];
    Storage.prototype.getItem.mockReturnValue(JSON.stringify(dummy));

    render(<App />);
    expect(screen.getByText('Dummy Task')).toBeInTheDocument();
    expect(localStorage.getItem).toHaveBeenCalledWith('tasks');
  });

  test('bisa menambah task baru dan tersimpan di localStorage', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/Task Title/i), { target: { value: 'New Task' } });
    fireEvent.click(screen.getByRole('button', { name: /Add Task/i }));

    expect(screen.getByText('New Task')).toBeInTheDocument();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'tasks',
      expect.stringContaining('"title":"New Task"')
    );
  });

  test('bisa menghapus task', () => {
    const one = [{ id:'x1', title:'To Delete', priority:'low', status:'todo', createdAt: new Date().toISOString() }];
    Storage.prototype.getItem.mockReturnValue(JSON.stringify(one));

    render(<App />);
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByText('To Delete')).not.toBeInTheDocument();
  });
});
