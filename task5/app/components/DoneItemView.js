import Marionette from 'backbone.marionette';
import template from '../templates/doneItem.jst';

export default Marionette.View.extend({
    template: template,
    initialize() {
        console.log('DoneItemView initialize')
    }
});