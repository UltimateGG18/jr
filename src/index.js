import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
<BrowserRouter>
<App />
</BrowserRouter>,document.getElementById("root")
);
reportWebVitals();
