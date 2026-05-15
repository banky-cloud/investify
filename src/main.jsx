
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import  { Toaster } from 'react-hot-toast';
import store from './state/state'


createRoot(document.getElementById('root')).render(
<>
<Toaster
position="top-center"
  reverseOrder={false}
/>
<Provider store={store}>

    <RouterProvider router={router}/>
</Provider>
</>
  
)
