// import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useRef } from "react";
const App = () => {
  const [list, setList] = useState(["pencil", "books"]);
  const [error, setError] = useState(false);

  const [editable, setEditable] = useState(-1);
  const [updateValue, setUpdateValue] = useState("");
  //-------------------------------

  return (
    <>
      <div className="container-xl mt-5">
        <div className="d-flex">
          <AddItem
            setError={setError}
            setList={setList}
            setEditable={setEditable}
          />
        </div>
        {error && (
          <div
            className=" mt-2 alert alert-danger d-flex align-items-center"
            role="alert"
            style={{ height: "40px" }}
          >
            <div>Input field is empty</div>
          </div>
        )}
        <div className="mt-2">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col" style={{ width: "300px" }}>
                  Items
                </th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    {editable == index ? (
                      <UpdateInput
                        updateValue={updateValue}
                        setUpdateValue={setUpdateValue}
                      />
                    ) : (
                      <td>{item}</td>
                    )}
                    <td style={{ display: "flex" }}>
                      <DeleteButton
                        list={list}
                        setList={setList}
                        index={index}
                        setEditable={setEditable}
                      />
                      {editable == index ? (
                        <UpdateButton
                          list={list}
                          setList={setList}
                          updateValue={updateValue}
                          index={index}
                          setEditable={setEditable}
                        />
                      ) : (
                        <EditButton
                          list={list}
                          setEditable={setEditable}
                          setUpdateValue={setUpdateValue}
                          index={index}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

function AddItem({ setError, setList, setEditable }) {
  const inputField = useRef(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    inputField.current.focus();
  }, [inputField]);

  function inputHandler(e) {
    setEditable(-1);
    console.log("Input rendered");
    setError(false);
    setInputValue(e.target.value);
  }

  function addButtonHandler() {
    if (inputValue == "") {
      inputField.current.focus();
      setError(true);
      setEditable(-1);
      return;
    }
    setEditable(-1);
    setInputValue("");
    setList((preVal) => [...preVal, inputValue]);
  }
  //-------------------------------
  function onKeyHandler(e) {
    if (e.key == "Enter") {
      if (inputValue === "") {
        setError(true);
        return;
      }
      setList((prev) => [...prev, inputValue]);
      setInputValue("");
    }
  }

  return (
    <>
      <input
        ref={inputField}
        onChange={inputHandler}
        onKeyDown={onKeyHandler}
        type="text"
        value={inputValue}
        className="form-control"
        placeholder="Place item"
      />
      <button
        onClick={addButtonHandler}
        type="button"
        className="btn btn-secondary"
        style={{ marginLeft: "10px" }}
      >
        Add
      </button>
    </>
  );
}
function UpdateInput({ updateValue, setUpdateValue }) {
  console.log("UpdateButton components rendered");
  let updateInputField = useRef();

  useEffect(() => {
    updateInputField.current.focus();
  }, [updateInputField]);

  function updateHandler(e) {
    setUpdateValue(e.target.value);
  }

  return (
    <td>
      <input
        ref={updateInputField}
        type="text"
        className="form-control"
        onChange={updateHandler}
        value={updateValue}
      />
    </td>
  );
}
function DeleteButton({ list, setList, index, setEditable }) {
  console.log("DeleteButton components rendered");

  function deleteHandler(itemID) {
    let newList = list.filter((_, index) => {
      return index != itemID;
    });
    setList(newList);
    setEditable(-1);
  }

  return (
    <button
      onClick={() => deleteHandler(index)}
      type="button"
      className="btn btn-danger"
    >
      Delete
    </button>
  );
}
function EditButton({ list, setEditable, setUpdateValue, index }) {
  console.log("EditButton components rendered");
  function editHandler(id) {
    setEditable(id);
    setUpdateValue(list[id]);
  }

  return (
    <button
      onClick={() => editHandler(index)}
      type="button"
      className="btn btn-success"
      style={{ marginLeft: "10px" }}
    >
      Edit
    </button>
  );
}
function UpdateButton({ list, setList, updateValue, setEditable, index }) {
  // console.log("update button");
  function update_btn_Handler(id) {
    let newList = list.map((item, index) => {
      if (index == id) {
        setEditable(-1);
        return (item = updateValue);
      }
      return item;
    });
    setList(newList);
  }
  return (
    <button
      onClick={() => update_btn_Handler(index)}
      type="button"
      className="btn btn-success"
      style={{ marginLeft: "10px" }}
    >
      Update
    </button>
  );
}
export default App;
