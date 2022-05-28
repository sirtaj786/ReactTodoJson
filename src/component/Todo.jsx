import React from 'react'

const Todo = () => {
    const [newTodo,setnewTodo]=React.useState("")
  const [todos, settodos] = React.useState([]);
  const [page, setPage] = React.useState(1);
// https://m6g3bt.sse.codesandbox.io/todos
  const addTodo=()=>{
      fetch("https://m6g3bt.sse.codesandbox.io/todos", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          value: newTodo,
          isComplete: false,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          settodos([...todos, data]);
          setnewTodo("");
          console.log(todos);
        });
  }

  React.useEffect(() => {
    fetch(`https://m6g3bt.sse.codesandbox.io/todos/?_page=${page}&_limit=10`)
      .then((res) => res.json())
      .then((data) => {
        settodos(data);
        setnewTodo("");
        console.log(data);
      });
  },[page]);

  return (
    <div>
      <h1>Todo</h1>
      <div className="page_div">
        <button onClick={() => (page > 1 ? setPage(page - 1) : setPage(1))}>
          Page {page-1}
        </button>
        <h3>Page number : {page}</h3>
        <button onClick={() => (page < 50 ? setPage(page + 1) : setPage(1))}>
          Page {page+1}
        </button>
      </div>
      <div></div>
      <div>
        <input value={newTodo} onChange={({target})=>setnewTodo(target.value)}/>
        <button onClick={addTodo}>+</button>
      </div>
      <div>
        {todos.map(el => (
           <p key={el.id}> Task : {el.value}</p>
        ))
        }
      </div>
    </div>
  );
}

export default Todo