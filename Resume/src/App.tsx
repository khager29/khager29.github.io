import "./App.css";
import { Education } from "./Education";
import { Header } from "./Header";

function App() {
    return (
        <>
            <header className="flex flex-col">
                <Header />
            </header>
            <main className="flex flex-col">
                <Education />
            </main>
        </>
    );
}

export default App;

