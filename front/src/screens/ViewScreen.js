import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../css/edit.css';

const Main = ({match, history}) => {
    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('');

    const Delete = () => {
        fetch(`http://127.0.0.1:8000/api/posts/${match.params.id}`, {
            method:'DELETE',
            headers:{
                'content-type':'application/json',
                'Authorization':'Token 646749ae67225129763e31aaa4d3818d54da978c'
            }
        })
        .then(res => {alert(res.status);return res.json()})
        .then(json => {alert(JSON.stringify(json));history.push('/')})
        .catch(e=>console.log(e))
    }
    
    React.useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/posts/${match.params.id}/`, {
            method:'GET',
            headers:{
                'content-type':'application/json'
            }
        })
        .then(res => res.json())
        .then(json => {setContent(json.content.replace('\\n', '\n'));setTitle(json.title)})
        .catch(e=>console.log(e))
    }, [])

    return (
        <>
        <input type='button' value='홈으로' onClick={()=>{history.push('/')}}/>
        <input type='button' value='수정하기' onClick={()=>{history.push(`/edit/${match.params.id}`)}}/>
        <input type='button' value='삭제하기' onClick={() => window.confirm('삭제하시겠습니까?')?Delete():undefined}/>
        <div style={{fontFamily:"GodoM", width:'100vw', height:'100vh', marginTop:'100px', backgroundColor:'gray'}}>
            <div style={{fontSize:55, fontFamily:'GodoB'}}>
                {title}
            </div>
            <div style={{fontSize:20}}>
                <ReactMarkdown children={content}/>
            </div>
        </div>
        </>
    )
}

export default Main;