import Filter from "../components/Filter"
import NoteCardContainer from "../components/NoteCardContainer"

const HomePage = ({notes,loading,handleFilterText}) => {
  return (
    <>

    {notes.length<1 ? <h4 style={{textAlign:"center", color:"red", padding:"20px"}}>There is No Note found</h4> : ""}
    <Filter handleFilterText={handleFilterText} />
     {/* <Filter handleFilterText={handleFilterText} /> */}
    <NoteCardContainer  notes={notes} loading={loading}/>
    </>
  )
}

export default HomePage