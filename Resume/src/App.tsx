import "./App.css";
import { Education } from "./Education";
import { Header } from "./Header";
import { Wrapper } from "./Wrapper";
import { DataProvider } from "./DataProvider";
import { Experience } from "./Experience";

function App() {
    return (
        <>
            <DataProvider>
                <Wrapper tag="header" className="flex flex-col">
                    <Header />
                </Wrapper>
                <Wrapper className="flex flex-col">
                    <Education />
                </Wrapper>
                <Wrapper className="flex flex-col">
                    <Experience />
                </Wrapper>
            </DataProvider>
        </>
    );
}

export default App;

