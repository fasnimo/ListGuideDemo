import React, {useState} from 'react'
import './App.css';
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.button`
  display:inline-block;
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  height: 30px;
  width: 50px;
  border-radius: 2px;
  cursor: pointer;
`;
const Text = styled.input`
  border: 2px solid #000;
`;

const TaskCount = styled.span`
  margin: 10px;
`;

const Tasks = styled.div`
`;


function App() {
  const [input, setInput] = useState("")
  const [todoList, setTodoList] = useState([])
  const [completedTaskCount, setCompletedTaskCount] = useState(0)
  const [pendingTaskCount, setPendingTaskCount] = useState(0)
  
  const handleClick = (e) => {
    e.preventDefault();
    const id = todoList.length + 1;
    setTodoList((prev) => [
      ...prev,
      {
        id: id,
        task: input, 
        complete: false,
      },
    ]);
    setInput('');
  }

  const handleChange = (e) => {
    console.log(e.id)
    let listPending = todoList.map((task) => {
      let itemPending = {};
      if(task.id == e.id) {
        if(task.complete) {
          setPendingTaskCount(pendingTaskCount + 1);
        } else {
          setPendingTaskCount(pendingTaskCount - 1);
        }
        itemPending = {...task, complete: !task.complete};
      } else itemPending = {...task}
      return itemPending;
    });
    setPendingTaskCount(listPending)
    setInput(e.value)
  }

  const handleComplete = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if(task.id == id) {
        if(!task.complete) {
          setCompletedTaskCount(completedTaskCount + 1);
        } else {
          setCompletedTaskCount(completedTaskCount - 1);
        }
        item = {...task, complete: !task.complete};
      } else item = {...task}
      return item;
    });
    setTodoList(list);
  };
  
  return (
    <Container>
      <div>
        <h2>Todo List</h2>
        {/* <Text value={input} onInput={(e) => setInput(e.target.value)}/> */}
        <Text value={input} onInput={(e) => handleChange(e.target)}/>
        <Button onClick={(e) => handleClick(e)}>Add</Button>
        <Tasks>
          <TaskCount>
            <b>Pending Tasks: </b>
            {pendingTaskCount}
          </TaskCount>
          <TaskCount>
            <b>Completed Task: </b>
            {completedTaskCount}
          </TaskCount>
        </Tasks>
        <div>
          <ul>
            {todoList.map((todo) => {
              return (
                <li
                  key={todo.id}
                  complete = {todo.complete}
                  id = {todo.id}
                  onClick= {()=> handleComplete(todo.id)}
                  style={{
                    listStyle: "none",
                    textDecoration: todo.complete && "line-through",
                  }}
                  >
                    {todo.task}
                  </li>
              );
            })}
          </ul>
        </div>
        <Button>Clear</Button>
      </div>
    </Container>
  );
}

export default App;
