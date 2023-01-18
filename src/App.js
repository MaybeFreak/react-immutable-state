import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  // const [allWorkouts, setAllWorkouts] = useState(workouts)
  const [showAll, setShowAll] = useState(false)

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    setWorkouts([...workouts, newWorkout])
    console.log("addNewWorkout:", newWorkout)
  }

  const deleteWorkout = (workout) => {
    const filteredWorkouts = workouts.filter((e) => e !== workout)
    setWorkouts([...filteredWorkouts])
    console.log("deleteWorkout:", workout)
  }

  const completeWorkout = (workout) => {
    workout.done = !workout.done
    setWorkouts([...workouts])
    console.log("completeWorkout:", workout)
  }

  // const showCompleted = (event) => { 
  //   const checked = event.target.checked
  //   setAllWorkouts([...workouts])
  //   if (!checked) {
  //     const filteredWorkouts = workouts.filter((e) => !e.done)
  //     setWorkouts([...filteredWorkouts])
  //   } else {
  //     setWorkouts([...allWorkouts])
  //   }
  // }


  const workoutsToRender = workouts.filter((element) => {
    if (showAll) return true
    if (!showAll && element.done) return false
    return true
  })

  const replaceWorkout = (workout) => {
    setWorkouts(
      workouts.map((element) => {
        if (element === workout) return generateWorkout()
        else return element
      })
    )
  }

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <span>
        <input type={'checkbox'} name={'completed'} id={'completed'} onChange={() => setShowAll(!showAll)} checked={showAll}/>
        <label htmlFor='completed'>Show completed</label>
      </span>
      <ul>
        {workoutsToRender.map((workout, index) => (
          <li key={index}>
          <p>
            {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
          </p>
          {!workout.done && 
            <button onClick={e=>completeWorkout(workout)}>Done</button>}
          {workout.done && 
            <p>✅</p>}
          <button onClick={e=>deleteWorkout(workout)}>Delete</button>
          <button onClick={e=>replaceWorkout(workout)}>Replace</button>
        </li>
        ))}
      </ul>
    </div>
  )
}

export default App
