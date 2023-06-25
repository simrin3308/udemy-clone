"use client"

import ImageUpload from "@/app/(components)/Inputs/ImageUpload";
import Input from "@/app/(components)/Inputs/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


interface CourseProps {
    name?:string,
      imageSrc?:string
      author?:string
      price?:string,
      courseId?:string
      description?:string | null
  }

  interface InitialStateProps {
    name:string,
    imageSrc:string
    author:string
    price:string,
    description:string
}   

const initialState:InitialStateProps = {
    name:'',
    imageSrc:'',
    author:'',
    price: '',
    description:''
}

const UpdateCourseComponent = ({ name,imageSrc,author,courseId,description, price}:CourseProps) => {


    const [state,setState] = useState(initialState)
    const router = useRouter()

    function handleChange(event:any ) {
		setState({ ...state, [event.target.name]: event.target.value });
	}
const onUpdate = () =>{

}
    return (
        <div>
    
              <div className='w-full flex flex-col justify-center items-center py-4'>
                <div className='p-4'>
                    <img  src={imageSrc} alt="Image" className='max-w-[900px]  bg-gray-50 p-4 border-4 border-black' />
                    <h1>{name}</h1>
                    <p>{price}</p>
                    <p>{author}</p>
                    <p>{description}</p>
                </div>
            </div>
            <form onSubmit={onUpdate} className='w-[600px] h-[700px] mx-auto py-12'>
    
    
            {/* <div>
                <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc',value)}/>
            </div> */}
    
            <div  className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
            <Input big placeholder='Course name' id='name' type='text' value={state.name} name='name' onChange={handleChange}/>
            <Input big placeholder='Authors' id='author' type='text' value={state.author} name='author' onChange={handleChange}/>
            <Input big placeholder='Description' id='description' type='text' value={state.description} name='description' onChange={handleChange}/>
            <Input big placeholder='Price' id='price' type='number' value={state.price} name='price' onChange={handleChange}/>
            <div> 
            </div>
            <button type='submit'>Submit</button>
            </div>
    
            </form>
    
        </div>
      )
    }



export default UpdateCourseComponent;