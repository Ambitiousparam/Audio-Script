import React from 'react'

const Header = () => {
  return (
    <header className="flex items-center justify-between gap-4 p-4">
    <h1 className='font-medium'>
      Audio <span className="text-blue-400 bold">Script</span>
    </h1>
    <button className=" specialbtn flex items-center gap-2 px-4 py-2 rounded-lg text-blue-400p">
      <p>New</p>
      <i className="fa-solid fa-plus"></i>
    </button>
  </header>
  )
}

export default Header