import React from 'react'

const Container = ({className, children}) => {
  return (
    <section className={`${className} sm:w-[800px] md:w-[800px] lg:w-[1000px] xl:w-[1500px] m-auto`}>
      {children}
    </section>
  )
}

export default Container