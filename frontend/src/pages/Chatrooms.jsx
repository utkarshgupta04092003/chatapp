import React from 'react';
import { Link } from 'react-router-dom';

export default function Chatrooms() {
  return (
    <div>
      all chatrooms
      <ul>
        <li>room1</li>
        <li>room1</li>
        <li>room1</li>
      </ul>

      <Link to={'/createchatroom'}>Create chatroom</Link>
    </div>
  )
}
