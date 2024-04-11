import Index from ".";
import FormProvider from "./context/FormContext";

function App() {
  return (
    <FormProvider>
      <Index />
    </FormProvider>
  );
}

export default App;
