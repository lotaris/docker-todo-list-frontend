var app = angular.module('ToDoList', []);

app.controller('ToDoListController', ['$scope', '$http', function($scope, $http) {

	// get all todos
	$http.get('/tl/api/list').success(function(data) {
		$scope.todos = data;
	});

	// add a new todo
	$scope.addToDo = function() {
		$http.post('/tl/api/list', {name: $scope.toDoName}).success(function(data) {
			$scope.todos.push(data);
			$scope.toDoName = '';
		});
	}

	// update a todo
	$scope.updateToDo = function(toDo) {
		if (toDo.checked) {
			$http.post('/tl/api/list/' + toDo.id + '/check');
		} else {
			$http.post('/tl/api/list/' + toDo.id + '/uncheck');
		}
	}

}]);
