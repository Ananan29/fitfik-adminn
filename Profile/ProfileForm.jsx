// import React, { useState, useEffect } from 'react';
// // import api from '../services/api';
// import config from "./../../config"
// import "./ProfileForm.css"
// const ProfileForm = () => {
//     const [profileData, setProfileData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         age: '',
//         height: '',
//         weight: '',
//         weightGoal: '',
//     });

//     // useEffect(() => {
//     //     // Fetch the user's profile data when the component mounts
//     //     const fetchProfileData = async () => {
//     //         try {
//     //             const response = await api.get(`${config.API_BASE_URL}/profile`);
//     //             setProfileData(response.data);
//     //         } catch (error) {
//     //             console.error('Error fetching profile data', error);
//     //         }
//     //     };

//     //     fetchProfileData();
//     // }, []);

//     // const handleChange = (e) => {
//     //     setProfileData({
//     //         ...profileData,
//     //         [e.target.name]: e.target.value
//     //     });
//     // };

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     try {
//     //         const response = await api.put(`${config.API_BASE_URL}/profileData`);
//     //         alert('Profile updated successfully!');
//     //     } catch (error) {
//     //         console.error('Error updating profile', error);
//     //     }
//     // };
//     useEffect(() => {
//         const fetchProfileData = async () => {
//             try {
//                 const response = await fetch(`${config.API_BASE_URL}/profile`, {
//                     method: 'GET',
//                     credentials: 'include',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 });
//                 const data = await response.json();
//                 setProfileData(data);
//             } catch (error) {
//                 console.error('Error fetching profile data', error);
//             }
//         };

//         fetchProfileData();
//     }, []);

//     const handleChange = (e) => {
//         setProfileData({
//             ...profileData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(`${config.API_BASE_URL}/profile`, {
//                 method: 'PUT',
//                 credentials: 'include',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(profileData),
//             });
//             if (response.ok) {
//                 alert('Profile updated successfully!');
//             } else {
//                 console.error('Error updating profile');
//             }
//         } catch (error) {
//             console.error('Error updating profile', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" name="name" value={profileData.name} onChange={handleChange} placeholder="Name" required />
//             <input type="email" name="email" value={profileData.email} onChange={handleChange} placeholder="Email" required />
//             <input type="password" name="password" value={profileData.password} onChange={handleChange} placeholder="Password" required />
//             <input type="number" name="age" value={profileData.age} onChange={handleChange} placeholder="Age" />
//             <input type="number" name="height" value={profileData.height} onChange={handleChange} placeholder="Height (cm)" />
//             <input type="number" name="weight" value={profileData.weight} onChange={handleChange} placeholder="Weight (kg)" />
//             <select name="weightGoal" value={profileData.weightGoal} onChange={handleChange}>
//                 <option value="gain">Gain Weight</option>
//                 <option value="lose">Lose Weight</option>
//             </select>
//             <button type="submit">Update Profile</button>
//         </form>
//     );
// };

// export default ProfileForm;

import React, { useState, useEffect } from 'react';
import config from "../config";
import "./ProfileForm.css";
import dayjs, { Dayjs } from "dayjs";
import Updateprofile from "./Updateprofile"
const Profile = () => {
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
    const [showupdate,setshowupdate]=useState(false)
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`${config.API_BASE_URL}/profile`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setProfileData(data);
            } catch (error) {
                console.error('Error fetching profile data', error);
            }
        };

        fetchProfileData();
    }, []);
    useEffect(()=>{
        const dob = dayjs(data.dob);
        const currentDate = dayjs();
        // const age = currentDate.diff(dayjs(data.dob), 'year');
        (currentDate.diff(dayjs(dob), 'year'))?setage((currentDate.diff(dayjs(dob), 'year'))):setage(0);
        // console.log("data.height",data?.height[0]?.height,"data.weight",data?.weight[0]?.weight,"data.dob",data?.dob?.slice(0,10),typeof data?.dob)
        // console.log("age",age)
    },[data])
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

    const getdata=()=>{
        // fetch(`${config.API_BASE_URL}/calorieintake/deletecalorieintake`,{
        //     method:"GET",
        //     headers:{
        //       "Content-Type":"application/json",
        //     },
        //     credentials:"include",
        //     body:JSON.stringify({
        //       name:item.item, //name item
        //       date:item.date
        //     })
        //   })
        //   .then(res=>res.json())
        //   .then(data=>{
        //     if(data.ok){
        //       // console.log(data.data,"calorie intake item deleted successfully")
        //       toast.success("calorie intake item deleted successfully")
        //       getcalorieintake()
        //       setchangemade(true);
        //     }
        //     else{
        //       toast.error("error in deleting calorie intake")
        //     }
        //   })
        //   .catch(err=>{
        //     toast.error("error in deleting calorie intake");
        //     console.log(err);
        //   })
    //     fetch(config.API_BASE_URL + '/report/getreport',{ 
    //     method: 'GET',
    //     credentials: 'include',
    //   })
    //   .then (res => res.json())
    //   .then (data => {
    //       console.log(data)
    //     if (data.ok) {
    //       setdata(data.data)
    //     }
    //     else {
    //       setdata([])
    //     }
    //  })
    // .catch(err => { 
    //   console.log(err);
    //   setdata([])
    // })
        fetch(`${config.API_BASE_URL}/profile/getdata`,{
            method:"GET",
            headers:{
              "Content-Type":"application/json",
            },
            credentials:"include",
            // body:JSON.stringify({
            // //   name:item.item, //name item
            // //   date:item.date
            // name: name,
            // password: password,
            // email: email,
            // weight: weight,
            // height: height,
            // gender: gender,
            // dob: dob,
            // goal: goal,
            // activityLevel: activityLevel,
            // })
          })
          .then(res=>res.json())
          .then(data=>{
            setdata(data)
            // console.log(data)
            if(data.ok){
              // console.log(data.data,"calorie intake item deleted successfully")
            //   toast.success("calorie intake item deleted successfully")
              console.log("data",data)
            }
            else{
            //   toast.error("error in deleting calorie intake")
            console.log("error",
            // data
            )
            }
          })
          .catch(err=>{
            // toast.error("error in deleting calorie intake");
            console.log(err);
        })
    }
    const updateshow=()=>{
        console.log("showupdate",showupdate)
    }
    useEffect(()=>{
        updateshow();
    },[showupdate])
    useEffect(()=>{
        getdata();
        console.log(data)
    },[])
    return (
        // <div className='profileoutlet'>
        //     <form onSubmit={handleSubmit} className="profile-form">
        //         <div className={"b"}>
        //             <p className={"p"}> Name </p>
        //             <input id="name" type="text" name="name" value={profileData.name} onChange={handleChange} placeholder={data.name} required />
        //         </div>
        //         <div className={"b"}>
        //         <p className={"p"}> Email </p><input id="email" type="email" name="email" value={profileData.email} onChange={handleChange} placeholder={data.email} required />
        //         </div>
        //         <div className={"b"}>
        //         <p className={"p"}> Password </p><input id="password" type="password" name="password" value={profileData.password} onChange={handleChange} placeholder={"*******"} required />
        //         </div>
        //         <div className={"b"}>
        //         <p className={"p"}> Age </p><input id="age" type="number" name="age" value={profileData.age} onChange={handleChange} placeholder={
        //             // dayjs()-
        //             data.age} />                </div>
        //         <div className={"b"}>
        //         <p className={"p"}> Height </p><input id="height" type="number" name="height" value={profileData.height} onChange={handleChange} placeholder={data.height} />
        //         </div>
        //         <div className={"b"}>
        //         <p className={"p"}> Weight </p><input id="weight" type="number" name="weight" value={profileData.weight} onChange={handleChange} placeholder={data.weight} />
        //         </div>
        //         <div>
        //         <select id="goal" name="goal" value={profileData.goal} onChange={handleChange}>
        //         <option value="gain">Gain Weight</option>
        //             <option value="maintain">Maintain Weight</option>
        //             <option value="lose">Lose Weight</option>
        //         </select>
        //         <select id="gender" name="gender" value={profileData.gender} onChange={handleChange}>
        //             <option value="male">Male</option>
        //             <option value="female">Female</option>
        //             <option value="other">Other</option>
        //             <option value="prefertonotsay">prefer to not say</option>
        //         </select>
        //         <select id="activitylevel" name="activitylevel" value={profileData.activitylevel} onChange={handleChange}>
        //             <option value="sedentary">Sedentary</option>
        //             <option value="light">Light</option>
        //             <option value="moderate">Moderate</option>
        //             <option value="active">Active</option>
        //             <option value="veryActive">Very Active</option>
        //         </select>
        //         <button type="submit">Update Profile</button>
        //         </div>
                
                
                    
        //     </form>
        //     {/* <div className='profile-form'>
        //         info
        //     </div> */}
        // </div>
        <div className='profileoutlet'>
            <div className="profile-page">
                    
                    
            {showupdate ? (
            // When showupdate is true, render <p>gh</p>
            (
                <div className="out">
                    <div className='profilepeoutlet'>
            {/* <form onSubmit={handleSubmit} className="profilepe-form">
                <div className={"b"}>
                    <p className={"p"}> Name </p>
                    <input id="name" type="text" name="name" value={profileData.name} onChange={handleChange} placeholder={data.name} required />
                </div>
                <div className={"b"}>
                <p className={"p"}> Email </p><input id="email" type="email" name="email" value={profileData.email} onChange={handleChange} placeholder={data.email} required />
                </div>
                <div className={"b"}>
                <p className={"p"}> Password </p><input id="password" type="password" name="password" value={profileData.password} onChange={handleChange} placeholder={"*******"} required />
                </div>
                <div className={"b"}>
                <p className={"p"}> Age </p><input id="age" type="number" name="age" value={profileData.age} onChange={handleChange} placeholder={
                    // dayjs()-
                    data.age} />                </div>
                <div className={"b"}>
                <p className={"p"}> Height </p><input id="height" type="number" name="height" value={profileData.height} onChange={handleChange} placeholder={data.height} />
                </div>
                <div className={"b"}>
                <p className={"p"}> Weight </p><input id="weight" type="number" name="weight" value={profileData.weight} onChange={handleChange} placeholder={data.weight} />
                </div>
                <div>
                <select id="goal" name="goal" value={profileData.goal} onChange={handleChange}>
                <option value="gain">Gain Weight</option>
                    <option value="maintain">Maintain Weight</option>
                    <option value="lose">Lose Weight</option>
                </select>
                <select id="gender" name="gender" value={profileData.gender} onChange={handleChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefertonotsay">prefer to not say</option>
                </select>
                <select id="activitylevel" name="activitylevel" value={profileData.activitylevel} onChange={handleChange}>
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Light</option>
                    <option value="moderate">Moderate</option>
                    <option value="active">Active</option>
                    <option value="veryActive">Very Active</option>
                </select>
                <button type="submit">Update Profile</button>
                </div>
                
                
                    
            </form> */}
            <Updateprofile setshowupdate={setshowupdate}/>
        </div></div>
        )
        ) : (
        <div className="content">
                        <div className="content__cover">
                        <div className="content__avatar"></div>
                        <div className="content__bull"><span></span><span></span><span></span><span></span><span></span>
                        </div>
                        </div>
                        {/* <div className="content__actions"><a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                            <path fill="currentColor" d="M192 256A112 112 0 1 0 80 144a111.94 111.94 0 0 0 112 112zm76.8 32h-8.3a157.53 157.53 0 0 1-68.5 16c-24.6 0-47.6-6-68.5-16h-8.3A115.23 115.23 0 0 0 0 403.2V432a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48v-28.8A115.23 115.23 0 0 0 268.8 288z"></path>
                            <path fill="currentColor" d="M480 256a96 96 0 1 0-96-96 96 96 0 0 0 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592a48 48 0 0 0 48-48 111.94 111.94 0 0 0-112-112z"></path>
                            </svg><span>Connect</span></a><a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path fill="currentColor" d="M208 352c-41 0-79.1-9.3-111.3-25-21.8 12.7-52.1 25-88.7 25a7.83 7.83 0 0 1-7.3-4.8 8 8 0 0 1 1.5-8.7c.3-.3 22.4-24.3 35.8-54.5-23.9-26.1-38-57.7-38-92C0 103.6 93.1 32 208 32s208 71.6 208 160-93.1 160-208 160z"></path>
                            <path fill="currentColor" d="M576 320c0 34.3-14.1 66-38 92 13.4 30.3 35.5 54.2 35.8 54.5a8 8 0 0 1 1.5 8.7 7.88 7.88 0 0 1-7.3 4.8c-36.6 0-66.9-12.3-88.7-25-32.2 15.8-70.3 25-111.3 25-86.2 0-160.2-40.4-191.7-97.9A299.82 299.82 0 0 0 208 384c132.3 0 240-86.1 240-192a148.61 148.61 0 0 0-1.3-20.1C522.5 195.8 576 253.1 576 320z"></path>
                            </svg><span>Message</span></a></div> */}
                        <br/><br/><div className="content__title">
                        <h1>{data.name}</h1><span>{data.email}</span>
                        </div>
                        <div className="content__description">
                        {(data?.goal)=="weightLose"?<p>Weight: Lose</p>:((data?.goal)=="weightGain"?<p>Weight: Gain</p>:<p>Weight: Maintain</p>)}
                        <p>Activity Level:{" "+data?.activityLevel?.charAt(0).toUpperCase()}{data?.activityLevel?.slice(1)}</p>
                        </div>
                        <ul className="content__list">
                        <li><span>{data?.height[0]?.height}</span>Height</li>
                        <li><span>{data?.weight[0]?.weight}</span>Weight</li>
                        <li><span>{age}</span>Age</li>
                        </ul>
                        <div className="content__button"><a className="button" href="#">
                            <div className="button__border"></div>
                            <div className="button__bg"></div>
                            <p className="button__text" onClick={()=>(setshowupdate(true))}>Update</p></a></div>
                    </div>)}
                    
        <div className="bg">
                        <div><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                        </div>
                    </div>

    {/* <div className="theme-switcher-wrapper" id="theme-switcher-wrapper"><span>Themes color</span>
        <ul>
        <li><em className="is-active" data-theme="orange"></em></li>
        <li><em data-theme="green"></em></li>
        <li><em data-theme="purple"></em></li>
        <li><em data-theme="blue"></em></li>
        </ul>
    </div>
    <div className="theme-switcher-button" id="theme-switcher-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path fill="currentColor" d="M352 0H32C14.33 0 0 14.33 0 32v224h384V32c0-17.67-14.33-32-32-32zM0 320c0 35.35 28.66 64 64 64h64v64c0 35.35 28.66 64 64 64s64-28.65 64-64v-64h64c35.34 0 64-28.65 64-64v-32H0v32zm192 104c13.25 0 24 10.74 24 24 0 13.25-10.75 24-24 24s-24-10.75-24-24c0-13.26 10.75-24 24-24z"></path>
        </svg>
    </div> */}
    </div>
</div>
    );
};

export default Profile;
