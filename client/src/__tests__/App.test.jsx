import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';
import { taskApi } from '../services/api.js';


vi.mock('../services/api.js', () => ({
  taskApi: {
    list: vi.fn(),
    create: vi.fn(),
    complete: vi.fn(),
  },
}));

describe('App', () => {
  test('renders fetched tasks', async () => {
    taskApi.list.mockResolvedValueOnce([{ id: 1, title: 'Buy books', description: 'For school' }]);
    render(<App />);

    expect(await screen.findByText('Buy books')).toBeInTheDocument();
  });

  test('submits a new task and refreshes the list', async () => {
    taskApi.list.mockResolvedValueOnce([]).mockResolvedValueOnce([
      { id: 2, title: 'Clean home', description: 'Weekend task' },
    ]);
    taskApi.create.mockResolvedValueOnce({ id: 2 });

    render(<App />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/title/i), 'Clean home');
    await user.type(screen.getByLabelText(/description/i), 'Weekend task');
    await user.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => expect(taskApi.create).toHaveBeenCalledWith({
      title: 'Clean home',
      description: 'Weekend task',
    }));
  });
});
