import {useState} from "react";

const CategoryModal = ({onHandelButton}:{onHandelButton: (key: string, value: string) => void}) => {
  const [value, setValue] = useState<string>('')

  return (
    <div className="modal">
      <div className="modal__container">
        <div className="category">
          <h1>Category</h1>
          <div className="category__form">
            <label>Category: </label>
            <input type="text" placeholder="Enter category" onChange={(event) => setValue(event.target.value)}/>
          </div>
          <div className="category_buttons">
            <button onClick={() => onHandelButton('cancel', '')}>Cancel</button>
            <button onClick={() => onHandelButton('add', value)}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;