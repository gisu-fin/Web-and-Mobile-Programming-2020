import React from 'react'

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

const Total = ({parts}) => {
  return (
      <div>
       <p>Total {parts.reduce((sum, {exercises}) => sum + exercises ,0)} exercises</p>
      </div>
    )
}

const Course = (props) => {
    return (
    <div>
    <Header course = {props.course} />
    <Contents parts = {props.course.parts}  />    
    <Total parts = {props.course.parts} />
    </div>
    )
}

export default Course