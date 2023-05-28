import React from 'react'
import MsgToast from '../components/Toast'

function page() {
  return (
    <div>
      <MsgToast task='new task' type="added" isLoading={false} />
    </div>
  )
}

export default page
