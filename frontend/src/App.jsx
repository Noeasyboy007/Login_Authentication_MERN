import FlotingShape from "./components/FlotingShape"

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-700 to-purple-950 flex items-center justify-center relative overflow-hidden">
      {/* For Background Floting Items */}
      <FlotingShape color="bg-purple-300" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FlotingShape color="bg-purple-300" size="w-48 h-48" top="40%" left="60%" delay={5} />
      <FlotingShape color="bg-purple-300" size="w-32 h-32" top="50%" left="5%" delay={2} />
    </div>
  )
}

export default App
