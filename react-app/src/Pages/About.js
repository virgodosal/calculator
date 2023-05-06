import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

const About = () => {
  return (

    <div>
    <h1 className='Page'>About Page</h1>
    <textarea
      className='textArea2'
      value="Customer: Hi, I'm looking for an online calculator that can help me save my previous calculations to my personal account. Do you have anything like that?

      You: Yes, I do! My online calculator has a feature that allows you to save your previous calculations and access them from your personal account. It's a great way to keep track of your calculations and save time in the future.

      Customer: That sounds really useful. How does it work?

      You: It's very easy to use. When you make a calculation, simply click on the Save Calculation button. This will prompt you to create a personal account, if you haven't already done so. Once you've created your account, your calculation will be saved to your account, and you can access it from anywhere you have an internet connection.

      Customer: That sounds great. Can I access my saved calculations from multiple devices?

      You: Yes, you can. As long as you're logged into your account, you can access your saved calculations from any device with an internet connection. So whether you're at home, at work, or on the go, you'll always have access to your calculations.

      Customer: That's exactly what I'm looking for. How do I get started?

      You: It's easy. Just go to my website and start using my online calculator. When you're ready to save your first calculation, click on the Save Calculation button and follow the prompts to create your personal account. From there, you'll be able to access your saved calculations whenever you need them.

      Customer: Thanks, I'll definitely give it a try."

      rows={8}
      style={{ minHeight: '80vh', minWidth: '80%' }}
      placeholder="Type your comment here... "
    />
      
  </div>

  )

}

export default About;