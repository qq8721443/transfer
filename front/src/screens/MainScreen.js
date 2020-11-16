import React from 'react'
import { useCookies } from 'react-cookie';
import {Link} from 'react-router-dom';

const Main = ({history}) => {

    const tempArray = [0, 1]
    const [list, setList] = React.useState()
    const [user, setUser] = React.useState()
    const [isFinish, setFinish] = React.useState(false)
    const [navNumber, setNumber] = React.useState(0)
    const [cookie, setCookie, removeCookie] = useCookies(['accessToken'])
  
    // function toggle(){
    //   const phrase = document.getElementById('im2').childNodes
    //   if(phrase[0].classList == ''){
    //     phrase[1].classList.remove('hidden')
    //     phrase[0].classList.add('hidden')
    //     phrase[2].classList.add('hidden')
    //   } else if(phrase[1].classList == '') {
    //     phrase[2].classList.remove('hidden')
    //     phrase[0].classList.add('hidden')
    //     phrase[1].classList.add('hidden')
    //   } else {
    //     phrase[0].classList.remove('hidden')
    //     phrase[1].classList.add('hidden')
    //     phrase[2].classList.add('hidden')
    //   }
    // }
  
    function callList() {
      fetch('http://127.0.0.1:8000/api/posts/', {
        method:"GET",
        headers:{
          'content-type':'application/json'
        }
      })
      .then(res => res.json())
      .then(json => {setList(json);setFinish(true)})
      .catch(e=>alert(e))
    }
  
    function callUser() {
      fetch('http://127.0.0.1:8000/users/')
      .then(res => res.json())
      .then(json => {setUser(json);alert(JSON.stringify(json))})
      .catch(e=>console.log(e))
    }
  
    React.useEffect(() => {
      callList();
      
      // setTimeout(() => {
      //   if(document.querySelector('canvas')!=undefined){
      //     const canvas = document.getElementById('more');
      //     const ctx = canvas.getContext('2d');
      //     ctx.strokeStyle = 'white';
      //     ctx.lineWidth=10;
          
      //     let i = 0
      //     const draw = setInterval(() => {
      //       ctx.beginPath();
      //       ctx.arc(50, 50, 20, 0, Math.PI * i);
      //       ctx.stroke();
      //       i+=0.01
      //       if(i==2){
      //         clearInterval(draw)
      //       }
      //     }, 0.1);
      //   }
      // }, 2000);
      
      // const timer = setInterval(toggle, 5000);
      // return () => clearInterval(timer)
    },[])
  
    return(
      <div id='container'>
        <div id='header'>
          <div id="mainicon">mainicon</div>
          <div id="plusbtn"><input type='button' value="plus" onClick={() => {cookie['accessToken']?history.push('/edit'):history.push('/login')}}/></div>
          <div id="info">
            {cookie['accessToken']?
            <>
            <span>{JSON.parse(localStorage.getItem('CURRENT_USER'))['username']}</span>
            <input type='button' value='logout' onClick={() => {removeCookie('accessToken');localStorage.setItem('CURRENT_USER',null)}}/>
            </>
            :
            <input type='button' value='login' onClick={() => history.push('/login')}/>}</div>
        </div>
        <div id='main'>
          {/* <div id='main_part1'>
            <span id="im1">저는</span>
            <span id="im2">
              <div id="im2_1" class="">남들 하는거 따라하는</div>
              <div id="im2_2" class="hidden">잘하는게 없는</div>
              <div id="im2_3" class="hidden">졸린</div>
            </span>
            <span id="im3">사람입니다.</span>
          </div> */}
          <div id='main_part2' style={{display:'flex', flexWrap:'wrap', marginTop:'25px'}}>
            {isFinish?list.slice(0,8).map((data, i) => {
              return (
              <Link to={`/detail/${data.id}`} style={{ color:'white'}}>
                <div class='card' onClick={() => setNumber(i+1)} style={{flex:1}}>
                  <div class="card_image">image</div>
                  <div class="card_title">{data.title}</div>
                  <div class="card_content" style={{overflowY:'hidden', height:'90px', backgroundColor:'lightcoral', textOverflow:'ellipsis'}}>{data.content.text}</div>
                  <div class="card_date">{data.created_dt.split('T')[0]}</div>
                  <div class="card_user">{data.user.username}</div>
                </div>
              </Link>
              )
            }):undefined}
            {/* <div> */}
              {/* {list?(list[3]?<canvas id="more" width="100" height="100"></canvas>:undefined):undefined} */}
            {/* </div> */}
          </div>
          
        </div>
      </div>
    )
  }

  export default Main;