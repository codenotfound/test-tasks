import Marionette from 'backbone.marionette';
import TodoView from './TodoView';

export default Marionette.Application.extend({
    region: '#app',

    onStart() {
        this.showView(new TodoView());
    }
});