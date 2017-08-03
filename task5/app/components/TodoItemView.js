import Marionette from 'backbone.marionette';
import template from '../templates/todoItem.jst';

export default Marionette.View.extend({
    template: template,
    initialize(options) {
        console.log('TodoItemView initialize');
        this.collectionView = options.collectionView;
    },
    ui: {
      complete: '.js-complete',
      remove: '.js-remove',
      higher: '.js-higher',
      lower: '.js-lower',
    },
    events: {
        'click @ui.complete': 'complete',
        'click @ui.remove': 'remove',
        'click @ui.higher': 'increasePriority',
        'click @ui.lower': 'decreasePriority',
    },
    complete() {
        console.log('complete');
        this.trigger('complete', this);
    },
    remove() {
        console.log('remove');
        this.model.collection.remove(this.model);
    },
    increasePriority() {
        const increasedPriority = this.model.get('priority') + 1;
        this.model.set('priority', increasedPriority);
        this.collectionView.resortView();
        console.log('increase priority ' + this.model.get('priority'));
    },
    decreasePriority() {
        const decreasedPriority = this.model.get('priority') - 1;
        this.model.set('priority', decreasedPriority);
        this.collectionView.resortView();
        console.log('decrease priority ' + this.model.get('priority'));
    }
});