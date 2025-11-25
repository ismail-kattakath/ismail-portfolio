import React from 'react'
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs'

const FormCP = ({ formClose, setFormClose }) => {
  return (
    <button
      aria-label="Form Open/Close"
      className="exclude-print fixed bottom-5 left-10 cursor-pointer rounded-full border-2 border-white bg-white font-bold text-red-800 shadow-lg"
      onClick={() => setFormClose(!formClose)}
    >
      {formClose ? (
        <BsFillArrowRightCircleFill className="h-10 w-10" title="Form Open" />
      ) : (
        <BsFillArrowLeftCircleFill className="h-10 w-10" title="Form Close" />
      )}
    </button>
  )
}

export default FormCP
