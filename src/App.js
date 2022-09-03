import { useState } from 'react';
// bootstrap import해오기
import { Button, Container, Navbar, Nav } from 'react-bootstrap';
import homeimg from './image/diaryHome.png';
import './App.css';
import data from './data';

function App() {

  let [shoes] = useState(data)

  return (
    <div className="App">
        <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">DingDiary</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#all">All</Nav.Link>
            <Nav.Link href="#diary">Diary</Nav.Link>
            <Nav.Link href="#sticker">Sticker</Nav.Link>
            <Nav.Link href="#mypage">Mypage</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className='main_bg' style={{backgroundImage : 'url(' + homeimg + ')'}}></div>

      <div className='container'>
        <div className='row p-5'>
          <div className='col-md-3'>
            <img src="https://shop-phinf.pstatic.net/20210507_216/1620367245493WXQpG_PNG/21503141210453845_922832556.png?type=f295_381" width="50%"/>
            <h4>{shoes[0].title}</h4>
            <p>{shoes[0].price}</p>
            <p>리뷰  평점</p>

          </div>
          <div className='col-md-3'>
          <img src="https://shop-phinf.pstatic.net/20220407_166/1649312159301nHmu1_PNG/50448054978951053_1342202723.png?type=f295_381" width="50%"/>
            <h4>beginning sticker</h4>
            <p>4,000원</p>
            <p>리뷰</p>
            <p>평점</p>
          </div>

          <div className='col-md-3'>
          <img src="https://shop-phinf.pstatic.net/20210302_87/1614676419608UoSNi_PNG/15812247364476123_1622586596.png?type=f295_381" width="50%"/>
            <h4>beginning sticker</h4>
            <p>4,000원</p>
            <p>리뷰</p>
            <p>평점</p>
          </div>

          <div className='col-md-3'>
          <img src="https://shop-phinf.pstatic.net/20220623_111/16559619809944RcfJ_JPEG/57097815649668580_598065363.jpg?type=f295_381" width="50%"/>
            <h4>beginning sticker</h4>
            <p>4,000원</p>
            <p>리뷰</p>
            <p>평점</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
