import Marionette from 'backbone.marionette';
import childView from './TodoItemView.js';

export default Marionette.CollectionView.extend({
    childView: childView,
    tagName: 'ul',
    initialize() {
        console.log('TodoCollectionView initialize');
    },
    onChildviewComplete: function(childView) {
        this.trigger('complete', childView);
    },
    childViewOptions: function() {
        return {
            collectionView: this
        }
    }
});