import { useState } from 'react';
// bootstrap import해오기
import { Button, Container, Navbar, Nav } from 'react-bootstrap';
import homeimg from './image/diaryHome.png';
import './App.css';
import data from './data'
import Detail from './pages/Detail'
import { Routes, Route, Link, useNavigate, Outlet, useParams } from 'react-router-dom'
import axios from 'axios';


function App() {
  let [products, setProducts] = useState(data)
  let navigate = useNavigate()
  let { id } = useParams();

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
        </Container>
      </Navbar>

      <Routes>

        <Route path="/" element={
          <>
          <div className='main_bg' style={{backgroundImage : 'url(' + homeimg + ')'}}></div>
          <div className='container p-3'>
            <div className='row p-5'>
              { products.map((a, i)=> {
                  return(<List products= {products[i]} key={i}/>
                  )})}
          </div>
        </div>
        <button onClick={()=> {
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

        <Route path="/detail/:id" element={<Detail products= {products} />} />

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

{/* <img src={process.env.PUBLIC_URL + '경로 /logo.png이런식'}></img> */}
export default App;
