import React from 'react'
import { useState, useEffect } from 'react'
import "./style.css"
const Todo = () => {

    // get the local data back 
    const getLocalData = () => {
        const lists = localStorage.getItem("myTodoList");
        if(lists){
            return JSON.parse(lists);
         } else{
            return [];
         }
        }
    

    const[inputData, setInputData] = useState("");
    const[items, setItems] = useState(getLocalData());
    const[isEditItem,setIsEditItem] = useState("");
    const [toggleButton, SetToggleButton] = useState(false);

    const addItem = () => {
        if(!inputData){
            alert("Plz fill the data"); 
        }else if (inputData && toggleButton){ 
            setItems(
                items.map((currElem) => {
                    if (currElem.id === isEditItem){
                        return{ ...currElem, name : inputData}
                    }
                    return currElem;
                })
            )

            setInputData("");
            setIsEditItem(null);
            SetToggleButton(false);

        }else{
            const myNewInputData = {
                id : new Date().getTime().toString(),
                name : inputData,
            }
            setItems([...items, myNewInputData])
            setInputData("");
        }
        };
        
        // edit the items 
        const editItem = (index) => {
            const item_todo_edited = items.find((currElem) => {
                return currElem.id === index;
            })
            setInputData(item_todo_edited.name);
            setIsEditItem(index);
            SetToggleButton(true);
        }



        // How to delete items section 
       
        const deleteItem = (index) => {
            const updatedItems = items.filter((currElem) => {
                return currElem.id !== index;
            });
            setItems(updatedItems) ;
        }

        // remove all elements 

        const removeAll = () => {
         setItems([]);
        }
        // adding local storage 

        useEffect(() => {
          localStorage.setItem("myTodoList", JSON.stringify(items))
        }, [items]);
        

  return (
    <>
    <div className='main-div'>
        <div className='child-div'>

            {/* todo logo and caption */}

            <figure>
                <img src="./images/todo.svg" alt="todo logo" />
                <figcaption>"Add Your List Here ✌"</figcaption>
            </figure>

            {/* Input items */}

            <div className='addItems'>
                <input type="text"
                placeholder='Add Item ✍'
                className='from-control'
                value={inputData}
                onChange={(event) => setInputData(event.target.value)} />
                {toggleButton ? (
                <i className="far fa-edit add-btn" onClick={addItem}></i>)
                 :(<i className="fa fa-plus add-btn" onClick={addItem}></i>
                 )}
            </div>

            {/* show our items */}
            <div className='showItems'>
            {items.map((currElem)=>{
                return(<div className='eachItem' key={currElem.id}>
                    <h3>{currElem.name}</h3>
                    <div className='todo-btn'>
                    <i className="far fa-edit add-btn" onClick={() => editItem(currElem.id)}></i>
                    <i className="far fa-trash-alt add-btn" onClick={()=> deleteItem(currElem.id)}></i>
                    </div>
                </div>
                )
            })}
                
            </div>

            {/* Check list and Remove All buton */}

            <div className='showItems'>
                <button className='btn effect04' data-sm-link-text = 'Remove all' onClick={removeAll}>
                    <span>CHECK LIST</span>
                </button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Todo;