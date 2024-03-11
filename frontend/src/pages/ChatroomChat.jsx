import React from 'react'
import { useParams } from 'react-router-dom';
export default function ChatroomChat() {

    const {groupName} =  useParams();
  return (
    <div>
      cahtroom chat - {groupName}
    </div>
  )
}
