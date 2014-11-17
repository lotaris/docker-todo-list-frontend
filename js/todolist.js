var app = angular.module('ToDoList', []);

app.controller('ToDoListController', ['$scope', '$http', function($scope, $http) {

	// get todos
	$scope.todos = [
		{
			"id": 1,
			"name": "test1",
			"checked": false
		},
		{
			"id": 2,
			"name": "test2",
			"checked": true
		},
		{
			"id": 3,
			"name": "test3",
			"checked": false
		}
	];

	$scope.addToDo = function() {
		// create todo
		$scope.toDoName = '';
	}

	$scope.updateToDo = function(toDo) {
		// update todo
	}

}]);
