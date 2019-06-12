import domain from  '@/config';
import Cookie from "@/component/cookie.js"
import {message} from "antd";
const commonUrl = domain.domain;
localStorage.setItem("access_token","test")

function parseJSON(response){
    return response.json()
}

function checkStatus(response){
    if(response.status >= 200 && response.status < 500){
        return response
    }
    const error = new Error(response.statusText)
    error.response = response
    throw error
}

export default  function request(options = {}){
    // const Authorization = localStorage.getItem('access_token')
    const {data,url,method} = options
    options = {...options}
    options.mode = 'cors'
    delete options.url;
    let newUrl = url;
    let token = Cookie.getCookie('login_key');
    let getData=[];
    if(method==='get'){
        newUrl=url+'?login_key='+token;
    }else if(method==='post'){
        if(document.cookie.indexOf('login_key=')!==-1){
            data.login_key=token;
        }
    }
    if(data){
        if(method==='get'){
            for(let key  in data){
                getData.push(key + '=' + data[key]);
            }
            newUrl=newUrl+'&'+getData.join('&');
        }else if(method==='post'){
            delete options.data;
            options.body = JSON.stringify(data);
        }
    }
    options.headers={
        // 'Authorization':Authorization,
        'Content-Type':'application/json'
    }
    return fetch(commonUrl+newUrl,options,{credentials: 'include'})
        .then(checkStatus)
        .then(parseJSON)
        .then((res)=>{
            if(res.response==="403"){
                message.error(res.content);
                if(window.location.pathname.includes('/admin')){
                    window.location = '/admin/login'
                }else{
                    window.location = '/login'
                }
            }
            return res
        })
        .catch(err=>({err}))
}