**React Basic**
# XYZ Component

## Description
The `xyz` component is a React functional component that demonstrates basic usage of:
- `useState` for managing local state
- `useEffect` for running side effects when data changes
- Custom functions
- Returning JSX/HTML structure

---

## Component Structure

```jsx
import React, { useState, useEffect } from 'react';

function xyz() {
  // useState: Declare a state variable
  const [state, setState] = useState(initialValue);

  // useEffect: Runs when specified dependencies change
  useEffect(() => {
    // This code runs when 'data' changes
  }, [data]); // 'data' is the dependency to watch

  // Example of a custom function
  const anyFunction = () => {
    // Function logic here
  };

  return (
    <div>
      {/* Component's HTML/JSX goes here */}
    </div>
  );
}

export default xyz;


**socket**
socket.emit : ony client get this (client will create this event, and only they will recieve it)

socket.broadcast.emit: everyone other then client will get this (so client have creted this event, but him self want recieve it)
io.emit: client will also recieve this

    socket.broadcast vs io.emit
    cient want get theier own message where in io.emit client can also see their own message



**package.json**

-- `setup` is custom command so: `npm run setup`
-- but in `start` you dont need `run`, since it is built in. (direct can use `npm start`)
-- when you use custom command you need `npm run <>` else can directly use `npm <>`
