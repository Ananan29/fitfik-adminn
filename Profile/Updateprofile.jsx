import React,{useState} from 'react'
import "./Updateprofile.css"
const Updateprofile = ({setshowupdate}) => {
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
        height: '',
        weight: '',
        weightGoal: '',
        gender:'',
        dob:'',
        activityLevel:''
    });
    const [data, setdata] = useState({name: "",
        password: "",
        email: "",
        weight: "",
        height: "",
        gender: "",
        dob: "",
        goal: "",
        activityLevel: "",
        })
    const [age, setage] = useState(0);
    const handleChange = (event) => {
        // const [name,value]=event.target
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${config.API_BASE_URL}/profile`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData),
            });
            if (response.ok) {
                alert('Profile updated successfully!');
            } else {
                console.error('Error updating profile');
            }
            
        } catch (error) {
            console.error('Error updating profile', error);
        }
    };
  return (
    <>
    <form className="form-style-7" onSubmit={handleSubmit}>
        <div><button className="cross" onClick={()=>(setshowupdate(false))}>X</button></div>
    <div>
    <ul>
<li>
    <label for="name">Name</label>
    {/* <input type="text" name="name" maxLength="100"/> */}
    <input id="name" type="text" name="name" value={profileData.name} onChange={handleChange} placeholder={data.name} required />
</li>
<li>
    <label for="email">Email</label>
    {/* <input type="email" name="email" maxLength="100"/> */}
    <input id="email" type="email" name="email" value={profileData.email} onChange={handleChange} placeholder={data.email} required />

</li>
<li>
    <label for="password">Password</label>
    <input id="password" type="password" name="password" value={profileData.password} onChange={handleChange} placeholder={""} required />
                
</li>
<li>
    <label for="age">Age</label>
    <input id="age" type="number" name="age" value={profileData.age} onChange={handleChange}/>                               
</li>
<li>
    <label for="age">Age</label>
    <input id="age" type="number" name="age" value={profileData.age} onChange={handleChange}/>                               
</li>

<li>
    <label for="height">Height</label>
    <input id="height" type="number" name="height" value={profileData.height} onChange={handleChange}/>                               
</li>

<li>
    <label for="weight">Weight</label>
    <input id="weight" type="number" name="weight" value={profileData.weight} onChange={handleChange}/>                               
</li>

<li>
    <label for="goal">Goal</label>
    <select id="goal" name="goal" value={profileData.goal} onChange={handleChange}>
        <option value="gain">Gain Weight</option>
        <option value="maintain">Maintain Weight</option>
        <option value="lose">Lose Weight</option>
    </select>                               
</li>

<li>
    <label for="gender">Gender</label>
    <select id="gender" name="gender" value={profileData.gender} onChange={handleChange}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
        <option value="prefertonotsay">Prefer to not say</option>
    </select>                               
</li>

<li>
    <label for="activitylevel">Activity Level</label>
    <select id="activitylevel" name="activitylevel" value={profileData.activitylevel} onChange={handleChange}>
        <option value="sedentary">Sedentary</option>
        <option value="light">Light</option>
        <option value="moderate">Moderate</option>
        <option value="active">Active</option>
        <option value="veryActive">Very Active</option>
    </select>                               
</li>

{/* <li>
    <label for="password">Password</label>
    <input id="password" type="password" name="password" value={profileData.password} onChange={handleChange} placeholder={""} required />
                
</li>
<li>
    <label for="url">Website</label>
    <input type="url" name="url" maxLength="100"/>
</li>
<li>
    <label for="bio">About You</label>
    <textarea name="bio" onKeyUp="adjust_textarea(this)"></textarea>
</li> */}
<li>
    <button type="submit" className='submitbutton'>Update Profile</button>
</li>
    </ul>
    </div>
</form>
      </>
  )
}

export default Updateprofile