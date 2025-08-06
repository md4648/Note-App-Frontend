import React from 'react'
import { ClipLoader } from "react-spinners";

let override={
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const Loader = ({loading}) => {
  return (
    // <ClipLoader
    //     // color={color}
    //     loading={loading}
    //     cssOverride={override}
    //     size={350}
    //     aria-label="Loading Spinner"
    //     data-testid="loader"
    //   />


     <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <ClipLoader
        loading={loading}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p style={{ marginTop: '1rem', fontSize: '1.2rem', color: 'red' }}>
        Loading...
      </p>
    </div>
  )
}

export default Loader