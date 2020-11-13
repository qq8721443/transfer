import React from 'react' 
import { useCookies } from 'react-cookie'

const Login = ({history}) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [cookies, setCookie] = useCookies(['accessToken'])

  const Submit = () => {
    fetch('http://127.0.0.1:8000/rest-auth/login/', {
      method:'POST',
      headers:{
        'content-type':"application/json"
      },
      body:JSON.stringify({
        username:username,
        password:password
      })
    })
    .then(res => {alert(res.status);return res.json()})
    .then(json => {
      if(json.key){
        setCookie('accessToken', json.key);localStorage.setItem('CURRENT_USER',JSON.stringify({'username':username}));history.push('/')
      }
      })
    .catch(e => alert(e))
  }

    return (
      <div style={{display:'flex', justifyContent:'center', alignItems:'center',width:'100vw', height:'100vh', backgroundColor:'#a8dda8'}}>
        <div style={{position:'absolute', top:0, left:0}}><input type='button' value='goback' onClick={() => history.goBack()}/></div>
        <div style={{backgroundColor:'white', width:'400px', height:'500px', borderRadius:'5px'}}>
            <input type="text" placeholder="ID" onChange={e => setUsername(e.target.value)}></input>
            <input type="password" placeholder="PASSWORD" onChange={e => setPassword(e.target.value)}></input>
            <input type="button" value="sign in" onClick={ () => Submit() }/>
            <input type="button" value="sign up" onClick={ () => history.push('/register') }/>
        </div>
      </div>
    )
  }

export default Login