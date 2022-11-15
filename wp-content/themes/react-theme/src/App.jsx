import { useState, useEffect } from "react";

const wp = "http://localhost/dat/wp-json/wp/v2"

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(wp + "/posts").then(res => res.json()).then(res => {setPosts(res)})
  }, [])
  
  console.log(posts)

  if (posts.length > 0) {
    console.log(posts[0].content.rendered)
  }

  return (
    <div className="App">
      
    </div>
  )
}

export default App
