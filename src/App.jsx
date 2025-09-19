import './App.css'
import './components/Sidebar.tsx'
import './components/NoteView.tsx' 
import './components/Notelist.tsx' // Windows is case insensitive, NoteList.tsx is registered as Notelist.tsx


function App() {

  return (
    <>
      <Sidebar/>
      <MainNotes>
        <NoteList/>
        <NoteView/>
      </MainNotes>
    </>
  )
}

export default App
