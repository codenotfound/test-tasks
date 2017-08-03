import Marionette from 'backbone.marionette';
import childView from './DoneItemView.js';

export default Marionette.CollectionView.extend({
    childView: childView,
    tagName: 'ul',
    initialize() {
        console.log('DoneCollectionView initialize');
    }
});