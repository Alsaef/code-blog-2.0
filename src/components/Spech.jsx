'use client'
import React from 'react';
import { AiFillSound } from "react-icons/ai";

const Spech = ({details}) => {

    const handelSpech=(detil)=>{
      console.log(detil);

      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('হ্যালো, তুমি কেমন আছো?');
        utterance.lang='en-EN'
          window.speechSynthesis.speak(utterance);
      }
    }
    return (
        <div className='my-5'>
            <button onClick={()=>handelSpech(details)} className='btn'><AiFillSound fontSize={40}/></button>
        </div>
    );
};

export default Spech;