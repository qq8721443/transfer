import React from 'react'

const Main = () => {
    const [username, setUsername] = React.useState()
    const [password1, setPassword1] = React.useState()
    const [password2, setPassword2] = React.useState()
    const [email, setEmail] = React.useState()

    const submit = () => {
        fetch('http://127.0.0.1:8000/rest-auth/registrations/', {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({
                username:username,
                password1:password1,
                password2:password2,
                email:email
            })
        })
        .then(res => res.json())
        .then(json => alert(json.username[0]))
        .catch(e => console.log(e))
    }
    
    return(
        <div>
            <input type='text' placeholder='아이디' value={username} onChange={ (e) => setUsername(e.target.value) }/>
            <input type='text' placeholder='비밀번호' value={password1} onChange={ (e) => setPassword1(e.target.value) }/>
            <input type='text' placeholder='비밀번호 확인' value={password2} onChange={ (e) => setPassword2(e.target.value) }/>
            <input type='text' placeholder='이메일' value={email} onChange={ (e) => setEmail(e.target.value) }/>
            <input type='button' value='test' onClick={() => submit()}/>
        </div>
    )
}

export default Main