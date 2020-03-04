import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';

const Header = (props) => {
    return (
        <div>
          <h1> {props.course.name} </h1>
        </div>
      )
}

const Contents = ({parts}) => {
    return (
        <div>
            {parts.map(part => <Part key = {part.id} part = {part} /> )}
        </div>       
      )
}

const Part = (props) => {
    return (
        <div>
         <p> {props.part.name}, {props.part.exercises}</p>
        </div>
      )
}

/*
const Total = (props) => {
    return (
        <div>
         <p>Total {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} exercises</p>
        </div>
      )
}
*/

//<Total parts = {props.course.parts} />
const Course = (props) => {
    return (
    <div>
    <Header course = {props.course} />
    <Contents parts = {props.course.parts}  />
    </div>
    )
}

const App = () => {
    const course = {
        name: 'Superadvanced web and mobile programming',
        parts: [
          {
            name: 'Basics of React',
            exercises: 8,
            id: 1
          },
          {
            name: 'Using props',
            exercises: 10,
            id: 2
          },
          {
            name: 'Component states',
            exercises: 12,
            id: 3
          },
          {
            name: 'Webbi Mobbi',
            exercises: 21,
            id: 4
          }
        ]
    }
    

  return (
    <div>
        <Course course={course} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)