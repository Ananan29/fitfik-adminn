
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
        weight: [{weight:52}],
        height: [{height:160}],
        gender: "",
        dob: "",
        goal: "",
        activityLevel: "",
        })
    const [age, setage] = useState(0);
    const [showupdate,setshowupdate]=useState(false);
    const [height,setheight]=useState(150);
    const [weight,setweight]=useState(52);
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
        (data?.weight[0]?.weight)?(setweight(data?.weight[0]?.weight)):(setweight(52))
        (data?.height[0]?.height)?(setheight(data?.height[0]?.height)):(setheight(52))
        console.log("data.height",data?.height[0]?.height,"data.weight",data?.weight[0]?.weight,"data.dob",data?.dob?.slice(0,10),typeof data?.dob)
        // console.log("age",age)
        console.log((data?.height[0]?.height)?(data?.height[0]?.height):(150),(data?.weight[0]?.weight)?(data?.weight[0]?.weight):52);
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
        <div className='profileoutlet'>
            <div className="profile-page">
                    
                    
            {showupdate ? (
            // When showupdate is true, render <p>gh</p>
            (
                <div className="out">
                    <div className='profilepeoutlet'>
            
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
                        
                        <br/><br/><div className="content__title">
                        <h1>{data.name}</h1><span>{data.email}</span>
                        </div>
                        <div className="content__description">
                        {(data?.goal)=="weightLose"?<p>Weight: Lose</p>:((data?.goal)=="weightGain"?<p>Weight: Gain</p>:<p>Weight: Maintain</p>)}
                        <p>Activity Level:{" "+data?.activityLevel?.charAt(0).toUpperCase()}{data?.activityLevel?.slice(1)}</p>
                        </div>
                        <ul className="content__list">
                        <li><span>{(data?.height[0]?.height)?data?.height[0]?.height:152}</span>Height</li>
                        <li><span>{(data?.weight[0]?.weight)?data?.weight[0]?.weight:50}</span>Weight</li>
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

    
    </div>
</div>
    );
};

export default Profile;
