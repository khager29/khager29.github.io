import "./App.css";
import { Education } from "./Education";
import { Header } from "./Header";
import { DataLoader } from "./DataLoader";
import { data } from "./assets/resumeData";

function App() {
    return (
        <>
            <DataLoader data={data}>
                <header className="flex flex-col">
                    <Header />
                </header>
                <main className="flex flex-col">
                    <Education />
                </main>
            </DataLoader>
        </>
    );
}

export default App;

