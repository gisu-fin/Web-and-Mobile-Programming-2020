import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';
import Course from './components/course.js';

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