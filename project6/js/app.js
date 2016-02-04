
/*jslint */
/*global app,angular,console,localStorage,document*/

var app = angular.module("listrOmniApp", ['ngRoute']);

app
    .config(function ($routeProvider) {
        'use strict';

        /**
         * Define routes for each view controller
         */
        $routeProvider
            .when('/groceryList', {
                templateUrl: 'groceryList.html',
                controller: 'groceryListController'
            })
            .when('/toDoList', {
                templateUrl: 'toDoList.html',
                controller: 'toDoListController'
            })
            .when('/contactList', {
                templateUrl: 'contactList.html',
                controller: 'contactListController'
            })
            .otherwise({
                redirectTo: "/groceryList"
            });

    })

    .controller('groceryListController', function ($scope, $timeout, DataService, $routeParams) {
        'use strict';
        angular.element(document).ready(function () {
            var pageData, savedData;

            savedData = DataService.getData('savedData');

            pageData = savedData.groceries;

            $timeout(function () {
                $scope.groceries = pageData;
            });

            /**
             * Updates the appropriate section of the local storage data
             */
            $scope.addNewListItem = function (newItem) {
                pageData.push(newItem);

                savedData.groceries = pageData;

                DataService.addData(savedData);

                savedData = DataService.getData('savedData');

              $timeout(function () {
                    $scope.groceries = savedData.groceries;
                });
            };

            $scope.deleteItem = function (itemIndex) {
                DataService.removeData('groceries', itemIndex);
                savedData = DataService.getData('savedData');
				pageData = savedData.groceries;
                $timeout(function () {
                    $scope.groceries = savedData.groceries;
                });
            };

        });

    })

    .controller('toDoListController', function ($scope, DataService, $timeout, $routeParams) {
        'use strict';

        angular.element(document).ready(function () {
            var pageData, savedData;

            savedData = DataService.getData('savedData');

            pageData = savedData.toDos;

            $timeout(function () {
                $scope.toDos = pageData;
            });

            /**
             * Updates the appropriate section of the local storage data
             */
            $scope.addNewListItem = function (newItem) {
                pageData.push(newItem);

                savedData.toDos = pageData;

                DataService.addData(savedData);

                savedData = DataService.getData('savedData');
              $timeout(function () {
                    $scope.toDos = savedData.toDos;
                });
            };

            $scope.deleteItem = function (itemIndex) {
                DataService.removeData('toDos', itemIndex);
                savedData = DataService.getData('savedData');
				pageData = savedData.toDos;
                $timeout(function () {
                    $scope.toDos = savedData.toDos;
                });
            };

        });
    })

    .controller('contactListController', function ($scope, $timeout, DataService, $routeParams) {
        'use strict';

        angular.element(document).ready(function () {
            var pageData, savedData;

            savedData = DataService.getData('savedData');

            pageData = savedData.contacts;

            $timeout(function () {
                $scope.contacts = pageData;
            });

            /**
             * Updates the appropriate section of the local storage data
             */
            $scope.addNewListItem = function (newItem) {
                pageData.push(newItem);

                savedData.contacts = pageData;

                DataService.addData(savedData);

                savedData = DataService.getData('savedData');
              $timeout(function () {
                    $scope.contacts = savedData.contacts;
                });
            };

            $scope.deleteItem = function (itemIndex) {
                DataService.removeData('contacts', itemIndex);
                savedData = DataService.getData('savedData');
				pageData = savedData.contacts;
                $timeout(function () {
                    $scope.contacts = savedData.contacts;
                });
            };

        });

    })

    .service('DataService', function () {
        'use strict';

        var savedData;

        savedData = {
            groceries: ['eggs', 'bread', 'milk', 'cheese'],
            toDos: [
                {
                    "title": "Create and Delete",
                    "dueDate": "2016-01-22T08:00:00.000Z",
                    "description": "Create a form that create and delete things"
                }

            ],
            contacts: [
                {
                    "name": "Timothy Castillo",
                    "address": "6544 Strolling Plains Lane",
                    "city": "Henderson",
                    "state": "NV",
                    "zipcode": "89011",
                    "email": "tjc0609@gmail.com",
                    "phoneNumber": "17028828663"
                }
            ]
        };

        /**
         * Retrieving local storage data to update page data
         * @return {JSON} savedData = Parsed version of local storage
         */
        this.getData = function () {
            var str = localStorage.getItem('savedData');
            savedData = JSON.parse(str) || savedData;
            return savedData;
        };

        /**
         * Adding new data to local storage
         * @param {string} arrayName = Category of data being stored (Options are 'groceries', 'toDos', and 'contacts')
         * @param {object} newData = JSON data to add to storage
         */
        this.addData = function (newData) {

            var savedData, str;

            savedData = newData;

            str = JSON.stringify(savedData);
            localStorage.setItem('savedData', str);
        };

        /**
         * Removing data from object in local storage
         * @param  {string} arrayName = Category of data to delete from (Options are 'groceries', 'toDos', and 'contacts')
         * @param  {[type]} deletedIndex = index to be deleted
         */
        this.removeData = function (arrayName, deletedIndex) {
            if (arrayName === 'groceries') {
                savedData.groceries.splice(savedData.groceries.indexOf(deletedIndex), 1);
            } else if (arrayName === 'toDos') {
                savedData.toDos.splice(savedData.groceries.indexOf(deletedIndex), 1);
            } else if (arrayName === 'contacts') {
                savedData.contacts.splice(savedData.groceries.indexOf(deletedIndex), 1);
            }

            var str = JSON.stringify(savedData);
            localStorage.setItem('savedData', str);
        };

    })

    .controller('listrOmniController', function ($scope, $location, $timeout) {
        'use strict';

        $scope.test = 'Hello, App Controller';
        angular.element(document).ready(function () {
            var location = $location;
          $scope.tabName = location.$$path;
        });

        /**
         * Function for highlighting active tab
         * @param  {string} tabName = string defining tab
         * @return {none}
         */
        $scope.tab = function (tabName) {
            $scope.tabName = tabName;
        };

    });
