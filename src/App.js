import { lazy, createContext, useEffect, useState, Suspense } from 'react';
// bootstrap import해오기
import { Button, Container, Navbar, Nav, Card } from 'react-bootstrap';
import homeimg from './image/diaryHome.png';
import './App.css';
import data from './data'
import { Routes, Route, Link, useNavigate, Outlet, useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';

// import Detail from './routes/Detail'
// import Cart from './routes/Cart.js';
// 메인페이지 로딩을 늦추는 아래 페이들은 필요할 때 로딩될 수 있도록 하기(react에 lazy import해야함)
// 단, 디테일페이지 들어갈 때 지연이 생기기 때문에 suspense로 로딩알려주면 좋음
const Detail = lazy(()=> import('./routes/Detail.js'))
const Cart = lazy(()=> import('./routes/Cart.js'))

// Context API사용하기 위한 3줄
export let Context1 = createContext() //context 곧,보관함 하나 만들기


function App() {

  // useEffect(()=>{
  //   if(localStorage.getItem('watched') !== null){
  //     // 아래 코드 실행하지 말아주세요..?
  //     localStorage.setItem('watched', JSON.stringify([]))
  //   }
  // }, [])

  //localStorage만드는법
  let obj = {name : 'kim'}
  localStorage.setItem('data', JSON.stringify(obj))
  let get = localStorage.getItem('data')
  console.log(JSON.parse(get));

  let [products, setProducts] = useState(data)
  let [storage, setStorage] = useState([10, 11, 12])
  let navigate = useNavigate()
  let { id } = useParams();

  // react query를 이용해서 ajax요청하면 아래 코드를 useQuery로 짜면됨
  // axios.get('http://codingapple1.github.io/userdata.json').then((a)=>{
  //   a.data
  // })
  let userLink = useQuery('userLink', ()=>{
    return axios.get('http://codingapple1.github.io/userdata.json').then((a)=>{
      return a.data
    }),
    { staleTime : 2000 } //refetch되는 간격조정 가능
  })
  console.log(userLink.data);
  console.log(userLink.isLoading); //true
  console.log(userLink.error); 

  return (

    <div className="App">
        <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">DingDiary</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/detail/0">All</Nav.Link>
            <Nav.Link href="#diary">Diary</Nav.Link>
            <Nav.Link href="#sticker">Sticker</Nav.Link>
            <Nav.Link onClick={() => {navigate('/detail')}}>Mypage</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            👩🏻{ userLink.isLoading ? '로딩중' : userLink.data.name}님
            {/* 👩🏻{ userLink.isLoading && '로딩중' }님 */}
            {/* 👩🏻{ userLink.error && '에러..났어요..' }님 */}
            {/* 👩🏻{ userLink.data && userLink.data.name }님 */}
            </Nav>
        </Container>
      </Navbar>

      <Routes>

        <Route path="/" element={
          <>
          <div className='main_bg' style={{backgroundImage : 'url(' + homeimg + ')'}}></div>

          <div class="d-flex">
            <div className='container p-3'>
              <div className='row p-5'>
                { products.map((a, i)=> {
                  return(<List products= {products[i]} key={i}/>
                  )})}
              </div>
            </div>
            <View product0= {products[0]}/>
          </div>

        <button class="button-60" onClick={()=> {
          axios.get('http://codingapple1.github.io/shop/data2.json')
          .then((result) => {
            console.log(result.data);
            let copy = [...products, ...result.data];
            setProducts(copy);
            console.log(copy);
          })
          .catch(()=>{
            console.log('axios로 데이터가져오기 실패');
          })
        }}>더 보기</button>
        </>
        }/>

      {/* <Suspense fallback={<div>로딩 중</div>}> */}
        <Route path="/detail/:id" element={
            <Context1.Provider value={{ storage }}>
            <Detail products= {products} />
        </Context1.Provider>
        } />

        <Route path="/cart" element={<Cart/>}></Route>
        
        <Route path="/event" element={<Event/>}>
          <Route path="one" element={<p>첫 주문 시 스티커 서비스</p>} />  
          <Route path="two" element={<p>생일기념 쿠폰 event</p>} />  
        </Route>

        <Route path="/about" element={<About/>}>
          <Route path="member" element={<div>member</div>} />  
          <Route path="location" element={<div>location</div>} />  
        </Route>

        {/* <Route path="*" element={<div>없는 페이지</div>}/> */}

      </Routes>
      {/* </Suspense> */}


      
    </div>
  );
}

function Event(){
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function About(){
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

  function List (props){
    return(
        <div className='col-md-3'>
          <img src={props.products.img} width='50%'/>
          <h4>{props.products.title}</h4>
          <p>{props.products.price}</p>
          <p>리뷰  평점</p>
        </div>
    )
  }

function View(props) {
  return (
    <div class="container col-2 d-flex justify-content-end m-1">
    <Card>
    <h6 class="p-2">최근 본 상품</h6>
      <Card.Img variant="top" src={props.product0.img} class="w-50 p-3 m-auto" />
      <Card.Body>
        <Card.Title>{props.product0.title}</Card.Title>
        <Button variant="light">다시보기</Button>
      </Card.Body>
    </Card>
    </div>
  );
}
{/* <img src={process.env.PUBLIC_URL + '경로 /logo.png이런식'}></img> */}
export default App;
