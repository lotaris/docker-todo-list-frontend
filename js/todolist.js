var app = angular.module('ToDoList', ['ui.bootstrap']);

app.controller('ToDoListController', ['$scope', '$http', function($scope, $http) {

	var todoList = [];

	// refresh the displayed list
	$scope.$watch('showCategory', function() {
		var todos = [];
		var completed = [];
		$scope.nbTodo = 0;
		$scope.nbCompleted = 0;

		for (var i in todoList) {
			var todo = todoList[i];
			if (todo.checked) {
				completed.push(todo);
				$scope.nbCompleted += 1;
			} else {
				todos.push(todo);
				$scope.nbTodo += 1;
			}
		}

		if ($scope.showCategory === 'all') {
			$scope.toDisplay = todoList;
		} else if ($scope.showCategory === 'todo') {
			$scope.toDisplay = todos;
		} else if ($scope.showCategory === 'completed') {
			$scope.toDisplay = completed;
		}
	});

	// get all todos
	$http.get('/tl/api/list').success(function(data) {
		todoList = data;
		$scope.showCategory = 'all';
	});

	// add a new todo
	$scope.addToDo = function() {
		$http.post('/tl/api/list', {name: $scope.toDoName}).success(function(data) {
			todoList.push(data);
			$scope.showCategory = 'all';
			$scope.toDoName = '';
		});
	};

	// update a todo
	$scope.updateToDo = function(toDo) {
		if (toDo.checked) {
			$http.post('/tl/api/list/' + toDo.id + '/check');
		} else {
			$http.post('/tl/api/list/' + toDo.id + '/uncheck');
		}
	};

	// delete completed todos
	$scope.removeCompleted = function() {
		
	};

}]);
