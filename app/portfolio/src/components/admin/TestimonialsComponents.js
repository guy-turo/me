import React ,{useState , useEffect} from 'react'
import axios from 'axios'
import UpdateTestimonials from './helper/UpdateTestimonials'
import { FaRegCircleRight } from "react-icons/fa6";
import { FaRegCircleLeft } from "react-icons/fa6";
import { LuImagePlus } from "react-icons/lu";
const TestimonialsComponent=()=>{
  const [moreFunction, setMoreFunction]=useState(true)
  const [addTest, setAddTest]=useState(false)
  const [TestimonialData,setTestimonialData]=useState([])

  const [message,setMessage]=useState('')
  const [successMessage, setSuccessMessage]=useState("")

  const [imageTestimonials,setImageTestimonials]=useState(null)
  const [nameT,setNameT]=useState('')
  const [titleT,setTitleT]=useState('')
  const [testimonialsT,setTestimonialsT]=useState('')

  const handleTestimonialFileName=(event)=>{
    const files=event.target.files[0]
    setImageTestimonials(files)
  }
  const fetchTestimonialData=()=>{
    const URI="http://localhost:8000/api/v1/me/testimonials"
    axios.get(URI)
    .then((res)=>{
      setTestimonialData(res.data)
    })
    .catch(error=>
      console.log(error.message)
      )
  }
  useEffect(()=>{
    
    fetchTestimonialData()
   
  },[])
  const addTestimonial=(e)=>{
    e.preventDefault()
    console.log('proceed')
    if(imageTestimonials===null){
      setMessage("please select a file to upload")
      return
    }else{
      const formData=new FormData()
      if(imageTestimonials){
          formData.append('file',imageTestimonials)
      }
      formData.append('name', nameT)
      formData.append('title',titleT)
      formData.append('testimonials',testimonialsT)
    const URI="http://localhost:8000/api/v1/me/testimonials"
      axios.post(URI,formData)
      .then((response)=>{
        if(response.status === 200){
          setMessage('testimonial has been created')
          setTimeout(()=>{
            setImageTestimonials()
            setSuccessMessage('')
            setNameT("")
            setTitleT("")
            setTestimonialsT("")
          },1500)
          
        }
      })
      .catch(error=>console.log(error))
    }
     
  }
  const deleteTestimonial=(id)=>{
    
    const URI=`http://localhost:8000/api/v1/me/testimonials/${id}`
    axios.delete(URI)
    .then((response)=>{
      if(response.status===200){
        setMessage('Deleted')
      }
    })
    .catch((e)=>setMessage(e.message))
  }
  return <div className="flex space-y-2 flex-col container shadow-2xl border border-solid border-gray-400 mt-4 p-2 rounded-md">
  <div className='flex justify-between'>
  <h1 className='text-gray-400'>Testimonials</h1>
  <button onClick={()=>setAddTest(!addTest)} className='border border-solid border-gray-400 rounded-md px-1 m-1'>Add Testimonial</button>
  </div>
  <div className={addTest?"":"hidden"}>
  <form onSubmit={addTestimonial}  className={` items-start space-y-2 flex flex-col`}>
      <div className=' flex flex-col '>
      <div className='grid grid-cols-2 sm:grid-cols-4 space-x-2 sm:space-y-1'>
      <label htmlFor="name">Name</label>
      <input type="text" required value={nameT} onChange={(e)=>setNameT(e.target.value)} id="name" className=" bg-gray-300 border rounded-md px-2 text-black border-solid border-blue-800"/>
     
      <label htmlFor="title">Title</label>
      <input type="text" required value={titleT} onChange={(e)=>setTitleT(e.target.value)} id="title" className=" bg-gray-300 border rounded-md px-2 text-black border-solid border-blue-800"/>
     
      <label htmlFor="testimonial">Testimonial</label>
      <input type="text" required value={testimonialsT} onChange={(e)=>setTestimonialsT(e.target.value)} id="testimonial" className=" bg-gray-300 border rounded-md px-2 text-black border-solid border-blue-800"/>
      </div>


      </div>
      <div >
          <label htmlFor='fi' className="flex w-full overflow-x-auto rounded-md shadow-md border border-solid border-gray-400 items-center space-x-2  cursor-pointer">
          <div className=" flex items-center    rounded-md border border-solid border-blue-700">
            {imageTestimonials===null &&<LuImagePlus className="flex size-20 "/>}
            {imageTestimonials!==null&& 
              <img src={URL.createObjectURL(imageTestimonials)} alt="" className=' flex size-20 rounded-md object-cover'/>
             }
          </div>
          <h2 className="flex font-normal px-2">Select testimonial pictures</h2>
         </label>
        <input type="file" required multiple id='fi'  onChange={handleTestimonialFileName} accept='image/*' hidden/>
        
          </div>
          <div className="space-y-1">
          {message && <textarea rows="1" cols="40" className='text-black  rounded-md  bg-red-500'>{message}</textarea>}
          {successMessage && <textarea rows="1" cols="40" value="Image uploaded successfully" className='text-black items-center justify-center flex  rounded-md  bg-green-500 text-center text-blue-800'></textarea>}
          <button type="submit" className="px-4 bg-green-700 w-full rounded-md">
            {message!=='' && <h3 className='text-red-700'>try again</h3>}
            {!message &&successMessage==="" && <h3>save</h3>}
            {successMessage && <h3>saved</h3>}
            </button>
      
          </div>
    </form>
  </div>
   
    <button className='w-fit' onClick={()=>setMoreFunction(!moreFunction)}>{moreFunction?<FaRegCircleLeft className='size-5 text-blue-500'/>:<FaRegCircleRight  className='size-5 text-blue-500'/>} </button>
    {TestimonialData.length!==0 && <div className="flex flex-row   rounded-md w-full h-full bg-transparent border border-solid border-black shadow-md">
    <ul className=" grid grid-cols-1 place-items-center  w-full mt-1 mb-1  sm:grid-cols-1 md:grid-cols-2 px-1     overflow-y-auto ">
      {TestimonialData.map(
        (item,index)=>(
        <li key={index} className=' shadow-2xl border mb-1 mt-1 border-solid border-gray-500  space-y-1 sm:space-y-0 sm:space-x-1 rounded-md w-60 h-60 items-center flex flex-col justify-center'>
           
                <img src={item.pictures} alt={item.title} className="w-16 h-16  shadow-md rounded-md pb-1 border border-solid border-gray-500"/>
              
            
          <h2 className='underline px-1 rounded-sm text-blue-950'>{item.name}</h2>
          <h2 className='underline font-normal px-1 rounded-sm'>{item.title}</h2>
          <h3 className='border-solid text-clip h-20 mx-2 font-normal border-gray-400  rounded-sm'>{item.testimonials}</h3>
          
          
          <div className={`space-x-2 ${moreFunction?"hidden":"block"}`}>
            <UpdateTestimonials  item={item}/>
            <button onClick={()=>deleteTestimonial(item._id)} className='border border-solid bg-red-800 border-gray-400 px-1 rounded-md'>Delete</button>
          </div>
        </li>)
        )}
    </ul>
   </div>}
  </div>
}

export default  TestimonialsComponent