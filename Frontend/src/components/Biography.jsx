import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className='banner'>
        <img src={imageUrl} alt="aboutImg" />
      </div>
      <div className='banner'>
       <p>Biography</p>
       <h3>Who we are</h3>
       <p>
       At ZeeCare, we are committed to enhancing healthcare delivery through innovative technology.
        Our Hospital Management System streamlines administrative tasks, optimizes patient care, 
        and improves hospital operations. With a focus on efficiency and user-friendliness,
        we empower healthcare providers to deliver better services to their patients.
       </p>
       <p>
       Our mission is to revolutionize healthcare management by offering reliable, secure, and scalable solutions for hospitals of all sizes.
       </p>
       <p>
       <i>Together, we aim to create a healthier 🍎 future through smarter management !</i>
       </p>
      </div>
    </div>
  )
}

export default Biography
