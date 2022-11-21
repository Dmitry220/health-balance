import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './chat-page.scss'

export const PersonalChat = () => {

	const id = Number(localStorage.getItem("id"))

	const [message, setMessage] = useState('')

	const [messages, setMessages] = useState<any>([])

	const [connected, setConnected] = useState<boolean>(false)

	const socket:any = useRef()

	const sendMessage = () => {
		if(message.trim()){
			let a = document.querySelector(`#qw${messages.length-1}`)
			a?.scrollIntoView({block: "start",behavior: "smooth"});
			const messagea = {
            message:message,
            id: id,
            event: 'message'
        }
        socket.current.send(JSON.stringify(messagea));
        setMessage('')
			
			//setMessages((prev:any)=>[...prev, message])		
		}
		setMessage('')
	}

	useEffect(()=>{
		socket.current = new WebSocket("wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self");

		socket.current.onopen = () => {
			console.log("Open");	
			// const message = {
			// 	event: 'connection',
			// 	id: id
			// }		
			// socket.current.send(JSON.stringify(message))
		}

		socket.current.onmessage= (event:any) => {				
			const message = JSON.parse(event.data)
			setMessages((prev:any)=>[...prev,message])
			console.log("message");			
		}

		socket.current.onclose= () => {
			console.log("close");			
		}

		socket.current.onerror= () => {
			console.log("error");			
		}
		// let a = document.querySelector('#qw9')
		// a?.scrollIntoView({block: "start",behavior: "smooth"});
		// console.log(a);
		
	}, [])
	
	
  return (
	 <div className='personal-chat'>
		<div className="personal-chat__messages">
		{/* <div className="personal-chat__message message-item">
			<div className='message-item_name text-blue'>Хелпер</div>
			<div className="message-item__text">
				Добрый день! Усейн, как я могу вам помочь?
			</div>
			<div className="message-item__time">12:32</div>
		</div>
		<div className="personal-chat__message message-item" style={{marginLeft: 'auto'}}>
			<div className="message-item__text">
				Ничем!
			</div>
			<div className="message-item__time">12:32</div>
		</div> */}
		{
			messages.map((mess:any, i:any)=>(
				<div className="personal-chat__message message-item" style={{marginLeft: id === mess.id ? 'auto' : 0}} key={i} id={'qw'+i}>
					<div className="message-item__text">
						{mess?.message}
					</div>
					<div className="message-item__time">12:32</div>
		</div>
			))
		}
		</div>
		
		<div className="personal-chat__send">
			<input 
			type="text" 
			className="personal-chat__input" 
			placeholder='Сообщение' 
			onChange={(e:ChangeEvent<HTMLInputElement>)=>setMessage(e.target.value)}
			value={message}
			/>
			<button className="personal-chat__submit icon-icon_send" onClick={sendMessage}></button>
		</div>
	 </div>
  )
}
