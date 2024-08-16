import React, { useState, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Storage from './components/Storage/Storage';
import ImageMenu from './components/image/menu.svg';
import imageSend from './components/image/sendSVG.svg';
import classes from './components/style/style.module.css'
type Todo = { 
  id:string,
  text: string,
  status: number
}
type Category ={ 
  name:string,
  status:number
}
type DisplayStyle = { 
  top:'30px' | '50%'
}
type ColorStyle = { 
  color:'black' | 'gray'
}

function App() {

  const [TText,setTText] = useState<Todo[]>([]);
  const [inputValue,setInputValue] = useState<string>('');
  const [todoFilter,setTodoFilter] = useState<number>(1);
  const [FOpen,setFOpen] = useState<boolean>(false);
  
  const category:Category[] = [
    {
      name:"Созданые",
      status:1
    },
    {
      name:"Выполненые",
      status:2
    }
  ]

  const onChangeInput = (event:ChangeEvent<HTMLInputElement>) =>{ 
    setInputValue(event.target.value)
  }
  const onClickPost =()=>{ 
    if (inputValue.trim() === '') return;
    const newTodo: Todo ={
      id:uuidv4(),
      text:inputValue,
      status:1
    }
    setTText(prev=> [...prev,newTodo])
    console.log(TText)
    setInputValue('')
  }
  const completedTODO = (id: string) => { 
    setTText(current => 
        current.map(todo => 
            todo.id === id ? { ...todo, status: todo.status !== 1 ? 1 : 2 } : todo
        )
    );
};
const deleteTODO = (id: string) => { 
  setTText(current => 
      current.filter(todo => todo.id !== id)
  );
};
  const OpenFilter = () =>{ 
    setFOpen(prev=> !prev);
  }
  const setNewStatus = (status:number) =>{ 
    if(status !== -1){ 
      setTodoFilter(status)
    }
  }

  const Dnone:DisplayStyle= { 
    top:"50%"
  }
  const Dblock:DisplayStyle = { 
    top:"30px"
  }
  const Sitem:ColorStyle = { 
    color:"gray"
  }
  const NSitem:ColorStyle = { 
    color:"black"
  }

  return (
    <div className="App">
      
      <div className={classes.todoWrapper}>
        <div style={FOpen?Dblock:Dnone} className={classes.modalWindow}>
            <div className={classes.modalConteiner}>
              {category.map(item=>(
                <div style={todoFilter === item.status?Sitem:NSitem} onClick={()=> setNewStatus(item.status)}>{item.name}</div>
              ))}
            </div>
        </div>
        <div className={classes.todoContainer}>
          
          <div className={classes.controllerWrapper}>
            <div style={{display:"flex",alignItems:"center"}}>
              <div style={{height:"40px",width:"40px",paddingLeft:"10px",cursor:"pointer"}} onClick={OpenFilter}>
                <img style={{height:"100%"}} src={ImageMenu} alt=""/>
              </div>
              <input 
                type="text" 
                value={inputValue}
                onChange={onChangeInput}
                className={classes.inputTodo}
                placeholder='Добавьте задачу'
              />
            </div>
            <button style={{height:"60px",padding:"10px",margin:"10px",background:"transparent",border:"unset"}} onClick={onClickPost}>
              <img style={{height:"100%"}} src={imageSend} alt=""/>
            </button>
          </div>
          <Storage data = {TText} onDelete={deleteTODO} status={todoFilter} onCompleted ={completedTODO} />
        </div>
      </div>
      </div>
  );
}

export default App;
