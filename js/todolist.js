var app = angular.module('ToDoList', ['ui.bootstrap']);

app.controller('ToDoListController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {

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
	$http.get('/tl/api/todos').success(function(data, status, headers) {
		$scope.todoList = data;
		$rootScope.$emit('RESPONSE_HEADERS', headers);
	});

	// add a new todo
	$scope.addToDo = function() {
		$http.post('/tl/api/todos', {name: $scope.toDoName}).success(function(data, status, headers) {
			$scope.todoList.push(data);
			$scope.nbTodo += 1;
			$scope.toDoName = '';
			$rootScope.$emit('RESPONSE_HEADERS', headers);
		});
	};

	// update a todo
	$scope.updateToDo = function(toDo) {
		if (toDo.checked) {
			$http.post('/tl/api/todos/' + toDo.id + '/check').success(function(data, status, headers) {
				$scope.nbTodo -= 1;
				$scope.nbCompleted += 1;
				$rootScope.$emit('RESPONSE_HEADERS', headers);
			});
		} else {
			$http.post('/tl/api/todos/' + toDo.id + '/uncheck').success(function(data, status, headers) {
				$scope.nbTodo += 1;
				$scope.nbCompleted -= 1;
				$rootScope.$emit('RESPONSE_HEADERS', headers);
			});
		}
	};

	// delete completed todos
	$scope.removeCompleted = function() {
		$http.delete('/tl/api/todos?type=completed').success(function(data, status, headers) {
			$scope.todoList = data;
			$rootScope.$emit('RESPONSE_HEADERS', headers);
		});
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

app.controller('FooterController', ['$scope', '$rootScope', function($scope, $rootScope) {

	$rootScope.$on('RESPONSE_HEADERS', function(event, headers) {
		$scope.lastIdentifier = headers('X-Server-Identifier');
	});

}]);
