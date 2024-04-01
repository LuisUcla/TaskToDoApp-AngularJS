var app = angular.module('crudApp', []);

app.controller('crudController', function($scope) {


    $scope.taskList = [];
    $scope.success = false;
    $scope.successMessage = '';
    $scope.error = false;
    $scope.editChange = 'all'
  

    $scope.getData = function() {
        const tasksDB = localStorage.getItem("task");
        $scope.taskList = tasksDB ? JSON.parse(tasksDB) : [];
    }

    $scope.setData = function(tasks) {
        localStorage.setItem("task", JSON.stringify(tasks));
    }

    $scope.selectTaskEdit = function(id) {
        const task = $scope.taskList.find(task => task.id == id);
        $scope.id = task.id;
        $scope.title = task.title;
        $scope.description = task.description;
    }

    $scope.selectTaskDelete = function(id) {
        $scope.id = id;
    }

    $scope.save = function() {
        if ($scope.title && $scope.description) {
            if ($scope.id) {
                $scope.editTask($scope.id);
                $scope.id = 0
            } else {
                $scope.getData();
                const task = {
                    id: $scope.taskList.length > 0 ? $scope.taskList[$scope.taskList.length - 1].id + 1 : 1,
                    title: $scope.title,
                    description: $scope.description,
                    status: 'pending'
                }
                $scope.taskList.push(task);
                $scope.message('Add task successfull...')
            }
     
            $scope.setData($scope.taskList);
            $scope.clearModel();
        }
    }

    $scope.clearModel = function() {
        $scope.id = 0;
        $scope.title = '';
        $scope.description = '';
    }

    $scope.editTask = function(id) {
        const index = $scope.taskList.findIndex(task => task.id == id);

        $scope.taskList[index].title = $scope.title;
        $scope.taskList[index].description = $scope.description;
        $scope.setData($scope.taskList);
        $scope.message('Edit task successfull...');
    }

    $scope.deleteTask = function() {
        $scope.getData()
        const index = $scope.taskList.findIndex(task => task.id == $scope.id);
        
        $scope.taskList.splice(index,1);
        $scope.setData($scope.taskList);
        $scope.clearModel();
        $scope.message('Delete task successfull...');
    }

    $scope.taskCompleted = function(id) {
        $scope.getData()
        const index = $scope.taskList.findIndex(task => task.id == id);

        if (index != -1) {
            $scope.taskList[index].status =  $scope.taskList[index].status == 'completed'
            ? 'pending'
            : 'completed'
        }
        $scope.setData($scope.taskList);
        $scope.clearModel()
    }

    $scope.change = function(value) {
        $scope.getData();
        const filter = $scope.taskList.filter(task => value == 'all' ? true : task.status == value);
        $scope.taskList = filter;

    }

    $scope.message = function(message) {
        $scope.success = true;
        $scope.successMessage = message;

        setTimeout(() => {
            $scope.success = false;
        }, 2500);
    }
})