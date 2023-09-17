import {useEffect, useState} from 'react'
import './App.css'
import {Todoprovider} from "./contexts";
import {TodoForm , Todoitem} from "./components/Index.js";

function App() {

    const [todos , settodos] = useState([]);

    const addTodo = (todo)=>{settodos((prev)=>[{id:Date.now(),...todo},...prev])}

    const updateTodo =(id,todo)=>{
        settodos( (prev)=>{
            prev.map((prevTodo)=>prevTodo.id===id ?  todo  : prevTodo   )})            }


    const deleteTodo = (id)=>{
        settodos((prev)=> prev.filter((todo)=>todo.id!==id))

    }


    const toggleComplete = (id)=>{
        settodos((prev)=>
            prev.map((prevtodo)=> // remainder
                prevtodo.id===id ?  {...prevtodo,completed:!prevtodo.completed }  : prevtodo
            )) }

        // context api are done

    // local storage start

    useEffect(()=>{
      const Ltodos =   JSON.parse(localStorage.getItem("todos"))  // Ltodos for local todos
        if(todos && todos.length>0){
            settodos(Ltodos)
        }
    },[])


    useEffect(() => {
        localStorage.setItem("todos",JSON.stringify(todos))
    }, [todos]);

  return (
    <Todoprovider value={{ todos,addTodo,updateTodo,deleteTodo,toggleComplete }}>
        <div className="bg-[#172842] min-h-screen py-8">
            <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                <div className="mb-4">
                    {/* Todo form goes here */}
                    <TodoForm/>
                </div>
                <div className="flex flex-wrap gap-y-3">
                    {/*Loop and Add TodoItem here */}
                    {
                        todos.map((todo) => (
                        <div key={todo.id}
                             className='w-full'
                        >
                            <Todoitem todo={todo} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </Todoprovider>
  )
}

export default App
