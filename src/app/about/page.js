import React from 'react'

const page = () => {
  return (
    <div>
      <h1>About Me</h1>
      <p>
        I'm Atharv Patil, a graduate of Penn State University, class of 2025, with a Bachelor of Science in Computer Science. 
        I'm currently seeking full-time roles in software engineering, with strong interests in backend systems, embedded 
        development, and tools that integrate hardware with software.
      </p>
      <p>
        My most recent experience was at Amphenol CS, where I interned as a Software Engineering Intern. During my time 
        there, I engineered a command-line utility in C++ for configuring I²C devices such as the PCA9685 and MPC9600, 
        enabling full access to chip functionalities like PWM control. I also implemented a PID temperature control algorithm 
        used in high-speed cable testing—learning embedded systems and device interfacing on the job through rapid prototyping 
        and close collaboration with mechanical engineers. The solutions I delivered became part of an approved, 
        production-grade test setup, contributing directly to engineering workflow efficiency.
      </p>
      <p>
        At Penn State, I've worked as a Computer Science Tutor at the Academic Excellence Center, supporting students in 
        key CS courses including CMPSC 131 (Python), 132 (OOP in Java), 221 (Systems Programming), and 311 (Data Structures 
        & Algorithms). I organized and led large-scale exam review sessions, some with 60+ students, which significantly 
        boosted student performance and helped the center secure additional funding and a new facility.
      </p>
      <p>
        Outside the classroom, I've contributed to THON, Penn State's nationally recognized student-run philanthropy, as 
        a member of the Hospitality Committee, helping support one of the largest student fundraising efforts in the world 
        for pediatric cancer research and support.
      </p>
      <p>
        My technical experience spans multiple domains:
      </p>
      <ul>
        <li>Systems Programming: Implemented a dynamic memory allocator in C with coalescing and segregated free lists.</li>
        <li>Computer Architecture: Built a 5-stage pipelined MIPS processor in Verilog, implementing data hazard resolution 
          via forwarding.</li>
        <li>Full-Stack Development: Developed a MERN-stack expense tracker and a complete B2B procurement platform using 
          React, Node.js, and MySQL.</li>
        <li>Distributed Systems: Built a peer-to-peer file sharing system with chunked file transfers, integrity checks, 
          and server-side coordination using Python sockets.</li>
        <li>AR/iOS Development: Created an augmented reality room decorator app with real-size furniture placement, ARKit 
          coaching overlays, and layout persistence.</li>
      </ul>
      <p>
        I enjoy high-ownership environments where I can learn quickly, solve complex technical problems, and build tools that 
        make a measurable difference. If you're looking for a well-rounded engineer who thrives in both hardware-aware and 
        full-stack settings, let's connect.
      </p>
    </div>
  )
}

export default page
