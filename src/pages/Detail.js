import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components'


// let YellowBtn = styled.button`
//   background : ${props => props.bg};
//   width : 30px;
//   height: 30px;
//   color: ${props => props.bg =='pink' ? 'black' : 'white'};
//   padding: 10px;
//   border:none;
//   `

// let NewBtn = styled.button(YellowBtn)`
//   margin : 10px
//   `

function Detail(props){
  let [alert, setAlert] = useState(true)
  let [num, setNum] = useState('')
  let { id } = useParams();
  let dataId = props.products.find( (product) => parseInt(product.id) ===  parseInt(id) );
  // console.log(dataId);

  // detail코드가 mount, update(=rerender) 시 useEffect함수가 실행됨 (컴포넌트 라이프사이클에 맞춰 실행되는 함수)
  // why?when? page rendering이 끝난 후 실행되는 함수이기 때문에 오래걸리는 부분은 useEffect에 넣어서 html로딩부터 시켜줄 수 있음 
  // 오래걸리는 작업, 타이머, 데이터 가져오기 같은 작업들을 실행함 
  //side Effect : 함수의 핵심기능과 상관없는 부가기능을 의미하여 이름을 유래 ㅋㅋ (TMI..)
  // useEffect(() => {
  // // 타이머 기능 
  // // 방법1
  // // setTimeout(()=>{
  // //   document.querySelector('.alert').style.display= "none";
  // //   }, 2000)
  // let timer = setTimeout(() => { setAlert(false) }, 2000)
  // return () => {
  //   clearTimeout(timer)  // useEffect실행 전에 실행할 코드 적어주기 (ex. cleanup function)  
  //   } 
  // }, [])

  useEffect(() => {
    if(isNaN(num) == true){
      alert('죄송합니다만 숫자만 입력 가능합니다.')
      } 
    }, [num])

  return(
    <div className='container'>
      {
        alert == true ? 
        <div className='alert alert-warning'>
          2초이내 구매 시 할인
        </div> : null
      }
      {/* <YellowBtn bg="grey">📚</YellowBtn> */}
      {/* <YellowBtn bg="pink">📌</YellowBtn> */}
      <div className='row'>
        <div className='col-md-6 p-3'>
            <img src={dataId.img} width='50%'/>
        </div>
        <div className='col-md-6'>
          {/* <input onChange((e)=>{ setNum(e.target.value) } ) /> */}
          <h4 className='pt-5'>{dataId.title}</h4>
          <p>{dataId.content}</p>
          <p>{dataId.price}원</p>
          <p>리뷰  평점</p>
          <button className='btn btn-dark'>주문하기</button>
        </div>
      </div>
    </div>
  )
}

export default Detail;