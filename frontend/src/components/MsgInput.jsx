import React from 'react'

export default function MsgInput() {
  return (
    <div className="flex items-center">
    <input type="text" placeholder="Type a message..." className="w-full border border-gray-200 p-2 rounded-md mr-2" />
    <button className="px-4 py-2 bg-purple-500 text-white rounded-md">Send</button>
</div>

  )
}
