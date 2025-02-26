import { useSelector } from 'react-redux';
import './App.css'
import Counter from './components/Counter'
import { RootState } from './store/store';
import UserComponent from './components/UserComponent';
import UserComponentWithCreateAPI from './components/UserComponentWithCreateAPI';
import GitHubCorner from './components/GithubCorner';

function App() {
  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <>
      <main>
        <GitHubCorner />

        <h1>
          Let's discuss Redux
        </h1>
        <section style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <h2>Cases with simple stores</h2>
          <div>I will count for you too: {count}</div>
       
          <Counter />
        </section>


        <section>
          <h2>Cases with API</h2>
          <div className='user-components'>

            <div className='user-components__block'>
              <h3>User Component (createAsyncThunk)</h3>
              <UserComponent />
            </div>

            <div className='user-components__block'>
              <h3>User Component (createAPI)</h3>
              <UserComponentWithCreateAPI />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
