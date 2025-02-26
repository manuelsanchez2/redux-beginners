import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../store/slices/counterSlice';
import { RootState } from '../store/store';

function Counter() {
    const count = useSelector((state: RootState) => state.counter.value);
    
    const dispatch = useDispatch();

    return (
        <div style={{
            border: '1px solid black',
            padding: '10px',
            margin: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            width: 'fit-content',
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '6px',
        }}>
            <h3>Counter: {count}</h3>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
        </div>
    )
}

export default Counter