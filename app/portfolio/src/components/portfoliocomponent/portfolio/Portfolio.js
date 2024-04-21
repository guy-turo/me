import React,{useEffect,useState} from 'react'
import me from '../../../assets/me.jpg'
import axios from 'axios'
import ViewDetailPortfolio from './helper/ViewDetailPortfolio'
const  Portfolio=()=> {
  const [portfolioData, setPortfolioData]=useState([])
  const fetchProjectData=()=>{
    const URI="http://localhost:8000/api/v1/me/projects"
    axios.get(URI)
    .then((res)=>{
      setPortfolioData(res.data)
    })
    .catch(error=>
     alert("something went wrong")
      )
  }
  useEffect(()=>{
    fetchProjectData()
  },[])
  return (
    <section id='portfolio'>
       <h5>My Recent Work</h5>
      <h2>Portfolio</h2>
      <div className='space-x-2 space-y-2'>
        <ul>
          {portfolioData && portfolioData.map((item, index)=><li key={index} className='h-fit'>
          <article className='bg-blue-900 hover:bg-blue-800 w-44 h-56 rounded-xl py-2 flex flex-col items-center'>
          
          <div className='shadow-2xl w-36 h-36 '>
            <img src={me} alt=""  className='flex size-36 rounded-3xl'/>
          </div>
          <div className="flex items-center justify-between w-full px-3 ">
            <div></div>
          <h3 className="text-zinc-300">{item.title}</h3>
          <ViewDetailPortfolio item={item}/>
          </div>
          
          <div className='flex flex-row justify-evenly w-full'>
          <a href={item.linkGithub} target='-blank' className='text-zinc-300 bg-transparent border border-solid rounded-lg border-indigo-200 px-2 hover:border-indigo-600'>Github</a>
          <a href={item.liveLink} target='_black' className='border-2 border-black rounded-md px-6 font-semibold text-black bg-blue-800 hover:bg-blue-900  border-solid  bg-transparent'>Live</a>
          </div>
        </article>
          </li>)}
        </ul>
      </div>
    </section>
  )
}

export default Portfolio
