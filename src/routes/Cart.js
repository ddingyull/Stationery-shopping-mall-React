import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { changeAge } from './../store/userSlice.js';
import { addCount } from './../store.js';
import { useMemo } from 'react';

// memo함수: props가 변할 때만 재랜더링해줌 (성능개선하고 싶을 때 활용할 함수)
// 단, props가 복잡할 경우 비교하면서 더 안좋아질 수 있으니 조심할 것! 자주 사용하지 않음
let Child = memo (function(){
  console.log(('재랜더링됨'));
  return <div>자식</div>
})


//useMomo: memo와 같은 기능인데 렌더링 중간에 진행되는 차이점만 있고 거의 비슷
function 어려운함수(){
  return 오래걸려서 나온 결과
}

function Cart() {

  let result = useMemo(()=>{return 어려운함수()}, [ state ])

  let state = useSelector((state) => { return state })
  let dispatch = useDispatch()

  return (
    <div>

    <Child></Child> 
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