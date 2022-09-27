import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { changeAge } from './../store/userSlice.js';
import { addCount } from './../store.js';

function Cart() {

  let state = useSelector((state) => { return state })
  let dispatch = useDispatch()

  return (
    <div>

    <h6>{state.user.age}세 {state.user.name}의 장바구니</h6>
    <button class="btn btn-dark m-3" 
    onClick={() => {dispatch(changeAge(10))}}>나이</button>

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>추가하기</th>
        </tr>
      </thead>
      <tbody>
        {
          state.cart.map((a, i) => 
          <tr key={i}>
            <td>{ state.cart[i].id }</td>
            <td>{ state.cart[i].name }</td>
            <td>{ state.cart[i].count }</td>
            <td><button class="btn btn-warning" onClick={()=>{
              dispatch(addCount(state.cart[i].id))
            }}>+</button></td>
        </tr>
          )
        }

      </tbody>
    </Table>
    </div>
  )
}

export default Cart;