var app = angular.module('ToDoList', ['ui.bootstrap']);

app.controller('ToDoListController', ['$scope', '$http', function($scope, $http) {

	$scope.todoList = [];
	$scope.showCategory = 'all';

	$scope.$watch('todoList', function() {
		$scope.nbTodo = 0;
		$scope.nbCompleted = 0;

		for (var i in $scope.todoList) {
			var todo = $scope.todoList[i];
			if (todo.checked) {
				$scope.nbCompleted += 1;
			} else {
				$scope.nbTodo += 1;
			}
		}
	});

	// get all todos
	$http.get('/tl/api/list').success(function(data) {
		$scope.todoList = data;
	});

	// add a new todo
	$scope.addToDo = function() {
		$http.post('/tl/api/list', {name: $scope.toDoName}).success(function(data) {
			$scope.todoList.push(data);
			$scope.nbTodo += 1;
			$scope.toDoName = '';
		});
	};

	// update a todo
	$scope.updateToDo = function(toDo) {
		if (toDo.checked) {
			$http.post('/tl/api/list/' + toDo.id + '/check');
			$scope.nbTodo -= 1;
			$scope.nbCompleted += 1;
		} else {
			$http.post('/tl/api/list/' + toDo.id + '/uncheck');
			$scope.nbTodo += 1;
			$scope.nbCompleted -= 1;
		}
	};

	// delete completed todos
	$scope.removeCompleted = function() {

	};

	// return true if a todo should be displayed
	$scope.shouldDisplayToDo = function(todo) {
		if ($scope.showCategory === 'all') {
			return true;
		} else if ($scope.showCategory === 'todo' && !todo.checked) {
			return true;
		} else if ($scope.showCategory === 'completed' && todo.checked) {
			return true;
		}
		return false;
	}

}]);
