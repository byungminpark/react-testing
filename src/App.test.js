import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import axios from 'axios';

import App from './App';

jest.mock('axios');



describe('App', () => {
  beforeEach(() => render(<App />));

  it('fetches stories from an API and displays them', async () => {
    // Setups
    const stories = [
      { objectId: '1', title: 'Hello' },
      { objectId: '2', title: 'React' }
    ];
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { hits: stories } }));

    // Exercise
    act(() => userEvent.click(screen.getByRole('button')));
    
    // Verify
    const listItems = await screen.findAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    expect(axios.get).toBeCalledTimes(1);
    expect(axios.get).toBeCalledWith(`http://hn.algolia.com/api/v1/search?query=React`);
  });
});
