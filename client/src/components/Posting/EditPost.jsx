import React from 'react';
import { useLocation } from 'react-router-dom';

export default function EditPost() {
  const location = useLocation();
  const post = location.state.experience;
  console.log(post);

  return <div>This is for editing</div>;
}
