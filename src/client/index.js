// js files
import { handleSubmit } from './js/formHandler'
import { updateUI } from './js/updateUI'

// sass files
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/header.scss'

document.getElementById('submit').addEventListener('click', handleSubmit);

export { handleSubmit }
export { updateUI }