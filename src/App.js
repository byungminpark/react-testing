
import { useState, useEffect } from 'react'; 

// import { screen } from '@testing-library/react';
// console.log(screen.queryByText('signed in as', {}));
// console.log(screen.findByText(/^signed in as$/i));

const getUser = () => Promise.resolve({ id: '1', name: 'Robin' });
 
function App() {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);
 
  useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      setUser(user);
    };

    loadUser();
  }, []);
 
  const handleChange = (event) => setSearch(event.target.value);
 
  return (
    <div>
      {user ? <p>Signed in as {user.name}</p> : null}
 
      <Search value={search} onChange={handleChange}>
        Search:
      </Search>
 
      <p>Searches for {search ? search : '...'}</p>
    </div>
  );
}


export function Search({ value, onChange, children }) {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
} 


export default App;

