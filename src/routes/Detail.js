import { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components'
import { Nav } from 'react-bootstrap';
import { Context1 } from './../App.js'
import { addItem } from './../store.js'
import { useDispatch } from 'react-redux';
// import ppnote_detail from '../image/ppnote_detail';

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
  let [tab, setTab] = useState(0)

  let {storage} = useContext(Context1) 
  let dispatch = useDispatch()

  //{}형태로 보관함해체
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

  useEffect(()=>{
    let get = localStorage.getItem('watched')
    get = JSON.parse(get)
    get.push(dataId.id)
    get = new Set(get) // 중복 없애주는 set 활용한 후 
    get = Array.from(get) // 다시 array로 바꿔주기
    localStorage.setItem('watched', JSON.stringify(get))
  },[])

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
          <button className='btn btn-dark' 
          onClick={(dataId)=>{
            dispatch(addItem({id : 2, name: 'kim', count : 1}))
          }}>주문하기</button>
        </div>
      </div>

    {/* tab */}
      <Nav variant="tabs"  defaultActiveKey="link0" className='m-5'>
        <Nav.Item>
          <Nav.Link onClick={ () => setTab(0) } eventKey="link0">상세정보</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={ () => setTab(1) } eventKey="link1">리뷰</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={ () => setTab(2) } eventKey="link2">Q&A</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} products= {props.products}/>

    </div>
  )
}

// function TabContent(props) {
  
//   if(props.tab === 0) {
//     return <div>작은 노트 안에 나의 순간이 쌓입니다. <br/>순간에서 하루로, 하루에서 한 달로, 다정하고 찬란하게</div>
//   }
//   if(props.tab === 1) {
//     return <div>리뷰</div>
//   }
//   if(props.tab === 2) {
//     return <div>큐앤에이</div>
//   }
// }

// 위코드 간단하게 작성한 버전
function TabContent({tab}){

  const [fade, setFade] = useState('')
  let {storage} = useContext(Context1)

  useEffect(() => {
    setTimeout(() => {setFade('end')}, 100)
    return () => {
      setFade('')
    }
  }, [tab])

  // return (<div className={ `start ${fade}`}>
  //   { [ <div>{products[0].title}</div>, <div>내용1</div>, <div>내용2</div> ][tab] } 
  //   </div>)
  return (<div className={ `start ${fade}`}>
  { [ <div>{storage}</div>, <div>내용1</div>, <div>내용2</div> ][tab] } 
  </div>)
  
}

export default Detail;