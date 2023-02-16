import Chart from "./lib/Chart";
import { apiData } from "./lib/api";

function App() {
  return(
    <Chart data={apiData}/>
  )
}

export default App;
