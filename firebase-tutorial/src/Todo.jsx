import firebase, { auth, firestore, functions } from "./firebase";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

const addTodo = functions.httpsCallable("addTodo");

const signOut = () => auth.signOut();

const Todo = () => {
  const [todo, setTodo] = useState("");

  const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);
  const query = todosRef.orderBy("complete");
  const [todos] = useCollectionData(query, { idField: "id" });

  const onSubmitTodo = async (event) => {
    event.preventDefault();

    await addTodo({
      text: todo,
      complete: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setTodo("");
  };

  const onCompleteTodo = async (id, complete) =>
    await todosRef.doc(id).set({ complete: !complete }, { merge: true });

  const onDeleteTodo = async (id) => await todosRef.doc(id).delete();

  if (!todos) return "Loading...";

  return (
    <>
      <header>
        {auth.currentUser && <button onClick={signOut}>Sign Out</button>}
      </header>
      <main className="main">
        <h1>Todos</h1>
        <form onSubmit={onSubmitTodo}>
          <input
            required
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="What's next?"
          />
          <button type="submit">Add</button>
        </form>
        {todos.map(({ id, text, complete }) => (
          <div key={id} className="todo">
            <button
              className={`todo-item ${complete ? "complete" : ""}`}
              tabIndex="0"
              onClick={() => onCompleteTodo(id, complete)}
            >
              {text}
            </button>
            <button onClick={() => onDeleteTodo(id)}>x</button>
          </div>
        ))}
      </main>
    </>
  );
};

export default Todo;
