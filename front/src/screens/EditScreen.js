import React from 'react';
import ReactMarkdown from 'react-markdown';
import {Link} from 'react-router-dom';
//import '../App.css'
import '../css/edit.css'
import {useCookies} from 'react-cookie'


const Main = ({match, history}) => {
    const [content, setContent] = React.useState('')
    const [title, setTitle] = React.useState('')
    const [cookie, setCookie] = useCookies()

    //const [isLoading, setLoading] = React.useState('')

    const submit = () => {
        fetch('http://127.0.0.1:8000/api/posts/', {
            method:'POST',
            headers:{
                'content-type':'application/json',
                'Authorization':`Token ${cookie['accessToken']}` //나중에는 쿠키에 저장된 토큰 전송
            },
            body:JSON.stringify({
                title:title,
                content:content.replace('\n', '\\n'),
            })
        })
        .then(res => res.json())
        .then(json => {alert(JSON.stringify(json));history.push(`/detail/${json.id}`)})//history를 이용해 화면 간 이동. 매우 유용
        .catch(e => console.log(e))
    }

    const modify = () => {
        fetch(`http://127.0.0.1:8000/api/posts/${match.params.id}/`,{
            method:'PUT',
            headers:{
                'content-type':'application/json',
                'Authorization':`Token ${cookie['accessToken']}`
            },
            body:JSON.stringify({
                title:title,
                content:content.replace('\n', '\\n')
            })
        })
        .then(res => res.json())
        .then(json => history.push(`/detail/${match.params.id}`))
        .catch(e=>console.log(e))
    }

    React.useEffect(() => {
        if(match.params.id){
            fetch(`http://127.0.0.1:8000/api/posts/${match.params.id}`, {
                method:'GET',
                headers:{
                    'content-type':'application/json'
                }
            })
            .then(res => res.json())
            .then(json => {setTitle(json.title);setContent(json.content.replace('\\n', '\n'))})
            .catch(e=>console.log(e))
        }
    }, [])

    if(match.params.id){
        return (
            <div style={{position:'relative', height:'100%', display:'flex', overflow:'auto', marginLeft:'15px', marginRight:'15px'}}>
            <div style={{position:'relative', flex:'1' , height:'100vh', boxShadow:'10px 0 35px gray'}}>
                <textarea placeholder="제목을 입력해주세요" style={{all:'unset', wordBreak:'break-all', width:'100%', fontSize:55, overflowY:'hidden', marginTop:'30px', fontFamily:'GodoB'}} onChange={e => setTitle(e.target.value)} value={title}></textarea>
                <textarea placeholder="내용을 입력해주세요" style={{all:'unset', wordBreak:'break-all', width:'97%', height:'60%', marginTop:'25px', fontSize:20, fontFamily:'GodoM'}} value={content} onChange={(e) => setContent(e.target.value)} />
                <div style={{width:'97%', height:'50px'}}>
                    <input class='backBtn' type='button' value='< 뒤로가기' onClick={() => history.goBack()} style={{position:'absolute', left:0}}/>
                    <input class='mainBtn' type='button' value='수정하기' onClick={() => {modify();}} style={{position:'absolute', right:10}}/>
                </div>
            </div>
            <div style={{overflowY:'auto', flex:1, paddingRight:'15px', height:'100vh' ,wordBreak:'break-all', fontSize:20, fontFamily:'GodoM'}}>
                <div style={{fontSize:50, fontFamily:'GodoB', fontSize:50, marginTop:'30px', marginLeft:'20px'}}>{title}</div>
                <div style={{marginLeft:'20px'}}>
                    <ReactMarkdown children={content}/>
                </div>
            </div>
        </div>
        )
    } else {
    return(
        <>
        <div style={{position:'relative', height:'100%', display:'flex', overflow:'auto', marginLeft:'15px', marginRight:'15px'}}>
            <div style={{position:'relative', flex:'1' , height:'100vh', boxShadow:'10px 0 35px gray'}}>
                <textarea placeholder="제목을 입력해주세요" style={{all:'unset', wordBreak:'break-all', width:'100%', fontSize:55, overflowY:'hidden', marginTop:'30px', fontFamily:'GodoB'}} onChange={e => setTitle(e.target.value)}/>
                <textarea placeholder="내용을 입력해주세요" style={{all:'unset', wordBreak:'break-all', width:'97%', height:'60%', marginTop:'25px', fontSize:20, fontFamily:'GodoM'}} value={content} onChange={(e) => setContent(e.target.value)} />
                <div style={{width:'97%', height:'50px'}}>
                    <input class='backBtn' type='button' value='< 뒤로가기' onClick={() => history.goBack()} style={{position:'absolute', left:0}}/>
                    <input class='mainBtn' type='button' value='제출하기' onClick={() => {submit();}} style={{position:'absolute', right:10}}/>
                </div>
            </div>
            <div style={{overflowY:'auto', flex:1, paddingRight:'15px', height:'100vh' ,wordBreak:'break-all', fontSize:20, fontFamily:'GodoM'}}>
                <div style={{fontSize:50, fontFamily:'GodoB', fontSize:50, marginTop:'30px', marginLeft:'20px'}}>{title}</div>
                <div style={{marginLeft:'20px'}}>
                    <ReactMarkdown children={content}/>
                </div>
            </div>
        </div>
        
        </>
    )
    }
}

export default Main