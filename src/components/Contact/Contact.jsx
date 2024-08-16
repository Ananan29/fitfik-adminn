import React,{useState, useEffect} from 'react'
import config from "./../../config"
import "./Contact.css"
const Contact = () => {
    const [data, setdata] = useState([])
    const getdata=()=>{
        fetch(`${config.API_BASE_URL}/contact`,{
            method:"GET",
            headers:{
              "Content-Type":"application/json",
            },
            credentials:"include",
          })
          .then(res=>res.json())
          .then(data=>{
            setdata(data)
            console.log(data)
            if(data.ok){
              // console.log(data.data,"calorie intake item deleted successfully")
            //   toast.success("calorie intake item deleted successfully")
              console.log("data",data)
            }
            else{
            //   toast.error("error in deleting calorie intake")
            console.log("error",data)
            }
          })
          .catch(err=>{
            // toast.error("error in deleting calorie intake");
            console.log(err);
        })
    }
    useEffect(()=>{
        getdata();
        console.log(data)
    },[])
  return (
    <div>
        {/* vhjuhgvbhjkuhg */}
        <ul>
            {
                data?.contact?.map((each)=>{
                    return (
                    <div className='mainbox'>
                        <div className="namemail">
                            name: {each.name}<br/>
                            email: {each.email}<br/>
                        </div>
                        <div className="month">
                            message: {each.message}
                        </div>
                    </div>
                    // {console.log("here",each)}
                    )
                })
            }
        </ul>
    </div>
  )
}

export default Contact