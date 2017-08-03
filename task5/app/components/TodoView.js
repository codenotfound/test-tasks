import Marionette from 'backbone.marionette';
import template from '../templates/todo.jst';
import TodoCollectionView from './TodoCollectionView';
import DoneCollectionView from './DoneCollectionView';

export default Marionette.View.extend({
    template: template,
    regions: {
        todoRegion: '[todo-region]',
        doneRegion: '[done-region]'
    },
    ui: {
        add: '.js-add',
        mainInput: '.main-input',
        todoTotal: '.js-todoTotal',
        doneTotal: '.js-doneTotal',
        readinessPercentage: '.js-readinessPercentage'
    },
    events: {
        'click @ui.add': 'add'
    },
    initialize() {
        this.todoCollection = new Backbone.Collection({
            title: 'Тестовое текущее дело',
            priority: 1
        });

        this.todoCollectionView = window.todoCollectionView = new TodoCollectionView({
            collection: this.todoCollection,
            viewComparator: model => -model.get('priority')
        });

        this.doneCollection = new Backbone.Collection({title: 'Тестовое выполненное дело'});
    },
    onRender() {
        this.showChildView('todoRegion', this.todoCollectionView);
        this.showChildView('doneRegion', new DoneCollectionView({
            collection: this.doneCollection
        }));

        this.listenTo(this.todoCollectionView, 'complete', this.onComplete);
        this.handleStatistics();
    },
    add() {
        const title = this.getUI('mainInput').val();
        if(title) {
            this.getUI('mainInput').val('');
            this.todoCollection.add({
                title: title,
                priority: 1
            });
        }
    },
    onComplete(childView) {
        this.doneCollection.add(childView.model);
        childView.remove();
    },
    handleStatistics() {
        //TODO: use data-binding
        const updateStatistics = () => {
            const todoTotal = this.todoCollection.length;
            const doneTotal = this.doneCollection.length;
            const readinessPercentage = doneTotal * 100 / ( todoTotal + doneTotal ) + '%';
            this.getUI('todoTotal').text(todoTotal);
            this.getUI('doneTotal').text(doneTotal);
            this.getUI('readinessPercentage').text(readinessPercentage);
        };
        updateStatistics();
        this.listenTo(this.todoCollection, 'change add remove', updateStatistics);
        this.listenTo(this.doneCollection, 'change add remove', updateStatistics);
    }
});
