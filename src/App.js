import React,{ useState , useRef , useEffect} from 'react';
import TodoList from './TodoList'

const { v4: uuidv4 } = require('uuid');
const LOCAL_STORAGE_KEY = 'todoApp.todos'
function App() {
  const [ todos , setTodos] = useState([])
  const todoNameRef = useRef()
  const { v4: uuidv4 } = require('uuid');

useEffect(() => {
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  if (storedTodos) setTodos(storedTodos)
},[])

useEffect(()  => {
  localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
}, [todos])

function handleClearTodo(){
  const newTodos = todos.filter(todo => !todo.complete)
  setTodos(newTodos)
}


function toggleTodo(id){
  const newTodos = [...todos]
  const todo = newTodos.find(todo => todo.id === id)
  todo.complete = !todo.complete
  setTodos(newTodos)
}
  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if(name === '')return
    setTodos(prevTodos => {
    return[...prevTodos,{id: uuidv4(),name:name , complete : false}]
  })
  todoNameRef.current.value = null
}

  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef}type="text"/>
    <button onClick={handleAddTodo} >Add New Todo</button>
    <button onClick={handleClearTodo}> Clear Completed</button>
  <div> {todos.filter(todo => !todo.complete).length} todos left</div>
    </>
  );
}

export default App;
