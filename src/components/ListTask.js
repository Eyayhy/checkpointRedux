import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addTodos,
  completeTodos,
  removeTodos,
  updateTodos,
} from "../redux/reducer";
import Task from "./Task";
import { AnimatePresence, motion } from "framer-motion";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodo: (id) => dispatch(removeTodos(id)),
    updateTodo: (obj) => dispatch(updateTodos(obj)),
    completeTodo: (id) => dispatch(completeTodos(id)),
  };
};

const ListTask = (props) => {
  const [sort, setSort] = useState("Not Done");
  return (
    <div className="displaytodos">
      <div className="buttons">
        <motion.button  style={{backgroundImage: `linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)`}}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("Not Done")}
        >
         Not Done
        </motion.button>
        <motion.button  style={{backgroundImage: `linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)`}}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("Done")}
        >
         Done
        </motion.button>
        <motion.button  style={{backgroundImage: `linear-gradient(to top, #fddb92 0%, #d1fdff 100%)`}} 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("all")}
        >
          All
        </motion.button >
      </div>
      <ul>
        <AnimatePresence>
          {props.todos.length > 0 && sort === "Not Done"
            ? props.todos.map((item) => {
                return (
                  item.completed === false && (
                    <Task
                      key={item.id}
                      item={item}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      completeTodo={props.completeTodo}
                    />
                  )
                );
              })
            : null}
        
          {props.todos.length > 0 && sort === "Done"
            ? props.todos.map((item) => {
                return (
                  item.completed === true && (
                    <Task
                      key={item.id}
                      item={item}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      completeTodo={props.completeTodo}
                    />
                  )
                );
              })
            : null}
          {/* for all items */}
          {props.todos.length > 0 && sort === "all"
            ? props.todos.map((item) => {
                return (
                  <Task
                    key={item.id}
                    item={item}
                    removeTodo={props.removeTodo}
                    updateTodo={props.updateTodo}
                    completeTodo={props.completeTodo}
                  />
                );
              })
            : null}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTask);