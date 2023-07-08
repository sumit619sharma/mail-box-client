import React from 'react'
import { useParams } from 'react-router-dom'

const MailDetail = () => {
     const {item} = useParams();
     const details = JSON.parse(decodeURIComponent(item));
  console.log('item in Detail',details);
     return (
    <div style={{margin: '10%'}} >
      <div>
      <div>
        from: {details.from}
      </div>
      </div>
      <div>
        Subject: {details.subject}
      </div>
      <div>
        message: {details.text}
      </div>
    </div>
  )
}

export default MailDetail
