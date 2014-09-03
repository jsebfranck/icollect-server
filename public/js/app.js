var app = angular.module("icollect", ["google-maps"]);

app.controller("GeolocController", function($scope, $http) {

    $scope.center = {
        latitude: 48.8609,
        longitude: 2.3456
    };

    $scope.seletedGender = '';

    google.maps.visualRefresh = true;

    angular.extend($scope, {
        map: {
            control: {},
            center: angular.copy($scope.center),
            zoom: 12,
            options: {
                disableDefaultUI: true,
                panControl: false,
                navigationControl: true,
                scrollwheel: false,
                scaleControl: false,



                streetViewControl: false,
                maxZoom: 20,
                minZoom: 3
            },


            markers: [],

            bounds: {},

            events: {

                dragend: function () {
                    var self = this;

                    console.log("dragend");
                },

                click: function(mapModel, eventName, originalEventArgs) {
                    var e = originalEventArgs[0];
                    var lat = e.latLng.lat(),
                        lon = e.latLng.lng();


                    console.log("{'latitude': " + lat + ", 'longitude': " + lon + "},");
                },

                zoom_changed: function (mapModel, eventName, originalEventArgs) {
                    var self = this;

                    $scope.map.markers = [];
                    $scope.map.circles = [];

                    if (mapModel.zoom >= 14) {

                    } else if (mapModel.zoom == 13) {
                        $scope.map.circles = $scope.regions;
                    }

                    //console.dir($scope.map.circles);


                    $scope.aggregateDonations();

                    /* if (mapModel.zoom >= 13) {
                        $scope.loadRegions();
                    } else if (mapModel.zoom >= 14) {
                        $scope.loadDonations();
                    } */
                }

            },

            circles: [

            ],

            onMarkerClick: function (m) {
                m.lastSignal = Math.round(Date.now()).toString();
                m.show = true;
                $scope.$apply();

            }
        }
    });

    $scope.filterGender = function(gender) {
        if (gender != $scope.seletedGender) {
            $scope.seletedGender = gender;

            $scope.map.markers = [];
            $scope.aggregateDonations();
        }
    };

    $scope.aggregateDonations = function() {

        if ($scope.map.circles.length > 0) {

            angular.forEach($scope.map.circles, function(valueCircle, keyCircle) {

                var marker = {
                    id: keyCircle,
                    coords: {
                        latitude: valueCircle.center.latitude,
                        longitude: valueCircle.center.longitude
                    },
                    show: true,
                    lastSignal: "Never",
                    count: 0
                };

                angular.forEach($scope.donations, function(value, key) {
                    if ($scope.isAccepted(value)) {
                        var distance = $scope.calcCrow(value.latitude, value.longitude,
                            valueCircle.center.latitude, valueCircle.center.longitude);
                        if (distance <= 1.72) {
                            marker.count++;
                        }
                    }
                });

                $scope.map.markers.push(marker);

            });
        } else {

            angular.forEach($scope.donations, function(value, key) {

                if ($scope.isAccepted(value)) {
                    $scope.map.markers.push({
                        id: key,
                        coords: {
                            latitude: value.latitude,
                            longitude: value.longitude
                        },
                        show: false,
                        lastSignal: "Never",
                        count: -1,
                        gender: value.gender,
                        firstname: value.firstname,
                        lastname: value.lastname
                    });
                }
            });
        }
    }

    $scope.isAccepted = function (donation) {

        return ($scope.seletedGender == '')
            || ($scope.seletedGender == donation.gender);
    }

    $scope.init = function() {

        $scope.loadRegions();
        $scope.loadDonations();
    };

    /**
     * lecture de l'information de régions
     */
    $scope.loadRegions = function() {
        // lecture de régions sur la carte
        $http.get('js/regions.json').success(function(data) {
            $scope.regions = [];
            angular.forEach(data, function(value, key) {
                $scope.regions.push({
                    id: key,
                    center: { latitude: value.latitude, longitude: value.longitude },
                    radius: 1700,
                    stroke: { color: value.color, weight: 1, opacity: 1 },
                    fill: { color: value.color, opacity: 0.5 }
                });
            });
        });
    };

    /**
     * Lecture de l'information de donations
     */
    $scope.loadDonations = function() {
        $scope.map.markers = [];
        // lecture des points sur la carte
        $http.get('/collect').success(function(data) {
            $scope.donations = data;
        });

    };

    $scope.calcCrow = function (lat1, lon1, lat2, lon2){
        var R = 6371; // km
        var dLat = $scope.toRad(lat2-lat1);
        var dLon = $scope.toRad(lon2-lon1);
        var lat1 = $scope.toRad(lat1);
        var lat2 = $scope.toRad(lat2);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d;
    };

    // Converts numeric degrees to radians
    $scope.toRad = function(Value) {
        return Value * Math.PI / 180;
    };

    $scope.isDonation = function(marker) {
        return marker.count == -1;
    }

    $scope.isNotDonation = function(marker) {
        return marker.count >= 0;
    }

    $scope.init();
});

app.controller('controlController', function ($scope) {
    $scope.controlText = 'I\'m a custom control';
    $scope.danger = false;
    $scope.controlClick = function () {
        $scope.danger = !$scope.danger;
        alert('custom control clicked!')
    };
});