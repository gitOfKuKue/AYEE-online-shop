import React from 'react'

const Container = ({className, children}) => {
  return (
    <section className={`${className} w-[1500px] m-auto`}>
      {children}
    </section>
  )
}

export default Container