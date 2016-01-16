
/*jslint */
/*global app,angular,localStorage,document*/

var app = angular.module("listrEnterpriseApp", []);

app
    .controller('directoryController', function ($scope, $timeout) {

        'Use Strict';

        angular.element(document).ready(function () {

            /**
             * Set variables
             */
            var personaList;

            $timeout(function () {

                $scope.personaList = JSON.parse(localStorage.getItem('personaList'));
                if ($scope.personaList === null) {
                    $scope.personaList = [
                        {
                            "birthdate":"1988-06-06T07:00:00.000Z",
                            "firstName":"Timothy",
                            "middleInitial":"J",
                            "lastName":"Castillo",
                            "position":"Front End Developer",
                            "address":"6544 Strolling Plains Lane",
                            "city":"Henderson",
                            "addressLine2":"Unit 103",
                            "state":"NV",
                            "zipcode":"89011",
                            "email":"tjc0609@gmail.com",
                            "phoneNumber":"17028828663"
                        }
                    ]
                }

            });

            /**
             * [getData description]
             * @return {object} [description]
             */
            $scope.getData = function () {

                var listData;

                // Get data from HTML5 storage
                listData = localStorage.getItem('personaList');

                // Parse data into object
                listData = JSON.parse(listData);

                // Return data
                return listData;
            };

            $scope.personaList = $scope.getData();

            console.log($scope.personaList);

            /**
             * [newPersona description]
             * @return {[type]} [description]
             */
            $scope.newPersona = function () {

                console.log($scope.newPersonaItem);

                var newPersonaItem;
                $scope.personaList = $scope.getData();

                personaList = $scope.personaList;

                if (personaList === null) {
                    personaList = [];
                }

                newPersonaItem = $scope.newPersonaItem;
                if (personaList.indexOf(newPersonaItem) === -1 && newPersonaItem !== undefined && newPersonaItem !== '') {

                    personaList.push(newPersonaItem);
                    console.log(personaList);
                    $scope.newPersonaItem = '';

                     // Stringify object
                    personaList = JSON.stringify(personaList);

                    // Save to HTML5 storage
                    localStorage.setItem('personaList', personaList);

                } else if (personaList.indexOf(newPersonaItem) > -1 && newPersonaItem !== undefined && newPersonaItem !== '') {
                    $scope.newPersonaItem = '';
                }

            };

            $scope.deleteItem = function (item) {
                var deletedItemIndex;

                deletedItemIndex = item;

                personaList = $scope.personaList;

                personaList.splice(deletedItemIndex, 1);

                $scope.personaList = personaList;

                 // Stringify object
                personaList = JSON.stringify(personaList);

                // Save to HTML5 storage
                localStorage.setItem('personaList', personaList);

            };

        });

    });
