import { useState,useEffect } from 'react';

function CommentSection() {
  const [newComment, setNewComment] = useState('');
  useEffect(()=>{
    console.log("On Client Side");
  })

  return (
    <div>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        style={{color:"black"}}
      />
    </div>
  );
}

export default CommentSection;
