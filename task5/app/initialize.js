import './styles/application.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import App from 'components/App';

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.start();
});
