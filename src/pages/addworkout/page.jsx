import React,{useState} from "react"
import "./addworkout.css"
import { toast } from "react-toastify";
import config from "../../config"
const Addworkoutpage = () => {
    const [workout, setWorkout] = useState({
        name: "",
        description: "",
        durationInMinutes: 0,
        exercises: [],
        imageURL: "",
        imageFile: null
    });

    const [exercise, setExercise] = useState({
        name: "",
        description: "",
        sets: 0,
        reps: 0,
        imageURL: "",
        imageFile: null
    });

    const handleWorkoutChange = (e) => {
        setWorkout({
            ...workout,
            [e.target.name]: e.target.value
        });
    }

    const handleExerciseChange = (e) => {
        setExercise({
            ...exercise,
            [e.target.name]: e.target.value
        });
    }

    const addExerciseToWorkout = () => {
        console.log(exercise)

        if(exercise.name == "" || exercise.description == "" || exercise.sets == 0 || exercise.reps == 0 || exercise.imageFile == null) {
            console.log("Please fill all the fields")
            // toast.error("Please fill all the fields",{
            //     position: toast.POSITION.TOP_CENTER,
            // })
            return;
        }

        setWorkout({
            ...workout,
            exercises: [...workout.exercises, exercise]
        })
        setExercise({
            name: "",
            description: "",
            sets: 0,
            reps: 0,
            imageURL: "",
            imageFile: null
        })
    }
    const deleteExerciseFromWorkout = (index) => {
        setWorkout({
            ...workout,
            exercises: workout.exercise.filter((exercise, i) => i !== index)
        })
    }
    const uploadImage = async (image) => {
        const formData = new FormData();
        formData.append("myimage", image);

        const response = await fetch(`${config.API_BASE_URL}/image-upload/uploadimage`,{
            method: "POST",
            body: formData,
        });
        if (response.ok) {
            const data = await response.json();
            console.log("Image uploaded successfully: ", data);
            //You can handle the response data here or return it to the caller.
            return data.imageUrl;
        }else{
            //Handle the case where the request failed (e.g. , server error)
            console.error("Failed to upload the image.");
            return null;
        }
    }
    const checkLogin = async () => {
        const response = await fetch(config.VITE_BACKEND_API + "/admin/checklogin", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include"
        });
            if (response.ok) {
                // Admin is authenticated
                console. log("Admin is authenticated");
            }else{
                // Admin is not authenticated
                console.log("Admin is not authenticated");
                window. location.href = "/adminauth/login";
            }
    }
    const saveWorkout = async () => {
        await checkLogin();
        console.log(workout)

        if (workout.name == "" || workout.description == "" || workout.durationInMinutes == 0 || workout.imageFile == null || workout.exercises.length == 0)
        {
            console.log("Please fill all the fields");
            // toast.error("Please fill all the fields", {
            //     position: toast.POSITION.TOP_CENTER,
            // });
            return; 
        }
            const imageURL = await uploadImage(workout. imageFile);
            if(imageURL) {
                setWorkout ({
                ...workout, 
                imageURL
                })
            }

        for (let i = 0; i < workout.exercises.length; i++) {
            let temping = workout.exercises[i].imageFile
            if (temping) {
                let imgURL = await uploadImage(temping);
                workout.exercises [i].imageURL = imgURL;
            }
        }

        console.log(workout)

        const response = await fetch(`${config.API_BASE_URL}/workoutplans/workouts`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(workout),
            credentials: "include"
        }) ;

        if (response.ok) {
            const data = await response.json();
            console.log("Workout created successfully", data); 
            // toast.success("Workout created successfully", {
            //     position: toast.POSITION.TOP_CENTER,
            // });
        }else {
            // Handle login error
            console.error("Workout creation failed", response.statusText);
        //     toast.error ("Workout creation failed", {
        //         position: toast.POSITION.TOP_CENTER,
        //     });
        }  

    }

  return (
    <div className="formpage">
        <h1 className="title">Add Workout</h1>
        <input 
            type="text"
            placeholder="Workout Name"
            name="name"
            value={workout.name}
            onChange={handleWorkoutChange} 
        />
        <textarea 
            placeholder= "Workout Description"
            name= "Description" 
            value= {workout.description}
            onChange={(e) => {
                setWorkout({
                    ...workout,
                    description: e.target.value
                })
            }}

            rows={5}
            cols={50}
        />
        <input 
            type="number" 
            placeholder="Workout Duration"
            name="durationInMinutes"
            value={workout.durationInMinutes}
            onChange={handleWorkoutChange}
        />
        <input 
            type="file" 
            placeholder="Workout Image"
            name="workoutImage"
            onChange={(e) =>
                setWorkout({
                    ...workout,
                    imageFile: e.target.files[0]
                })
            }
        />
        <div
        // style={}
        className="thirddiv"
        >            
            <h2 className="title">Add Exercise to workout</h2>
            <input 
                type="text" 
                placeholder="Exercise Name"
                name="name"
                value={exercise.name}
                onChange={handleExerciseChange}
            />
            <textarea 
                placeholder="Exercise Description"
                name="description" 
                value={exercise.description}
                onChange={(e) => {
                    setExercise({
                        ...exercise,
                        description: e.target.value
                    })
                }}
    
                rows={5}
                cols={50}
            />
            <label htmlFor="sets">Sets</label>
            <input 
                type="number" 
                placeholder="Sets"
                name="sets"
                value={exercise.sets}
                onChange={handleExerciseChange}
            />
            <label htmlFor="reps">Reps</label>
            <input 
                type="number" 
                placeholder="Reps"
                name="reps"
                value={exercise.reps}
                onChange={handleExerciseChange}
            />
            <input 
            type="file" 
            placeholder="Exercise Image"
            name="exerciseImage"
            onChange={(e) =>
                setExercise({
                    ...exercise,
                    imageFile: e.target.files[0]
                })
            }
            />
            <button
                onClick={(e) => {
                    addExerciseToWorkout(e)
                }}
            >Add Exercise
            </button>


        </div>

        <div className="exercises">
            {
                workout.exercises.map((exercise, index) => {
                    <div className="exercise" key={index}>
                        <h2>{exercise.name}</h2>
                        <p>{exercise.description}</p>
                        <p>{exercise.sets}</p>
                        <p>{exercise.reps}</p>

                        <img src= {
                            exercise.imageFile ?
                            URL.createObjectURL(exercise.imageFile) :
                            exercise.imageURL
                        } alt="" />

                        <button
                            onClick={() => deleteExerciseFromWorkout(index)}>
                                Delete
                        </button>

                    </div>
                })
            }
        </div>
        <button
                onClick={(e) => {
                    saveWorkout(e)
                }}
            >Add Workout
            </button>

    </div>
  )
}

export default Addworkoutpage