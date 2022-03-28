import React ,{useState}from 'react'

const usePasstoggle= () => {
    const [visible,setvisible] = useState("");
  const InputType = visible ? "text" : "password";
  const TogText = (<div className="btnshow"> <a href="#" onClick={() => setvisible(visible => !visible)}>{visible ? "hide" : "show"}</a></div>);
  return [InputType,TogText];
}

export default usePasstoggle