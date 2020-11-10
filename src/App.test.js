import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App, { Search } from './App';

describe('App', () => {
  // 1
  it('waits element rendered by fetching effect', async () => {
    render(<App />);
    // Implicit test
    await screen.findByText(/Signed in as/);
  });
  
  // 2
  it('changes element\'s text after type event firing', () => {
    render(<App />);
    // Before
    expect(screen.queryByText(/Searches for Song/)).toBeNull();
    
    // Firing
    userEvent.type(screen.getByRole('textbox'), 'Song');
    
    // After
    expect(screen.getByText(/Searches for Song/)).toBeInTheDocument();
  });
  
  // 3
  it('calls the onChange callback handler for Search', () => {
    const onChange = jest.fn(); // mock

    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );

    userEvent.type(screen.getByRole('textbox'), 'Song');

    expect(onChange).toHaveBeenCalledTimes(4);
  });
});
