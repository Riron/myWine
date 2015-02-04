function fileread() {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    scope.fileread = changeEvent.target.files[0].name;
                });
            });

            if(device.platform.toLowerCase() === 'android' && device.version.indexOf('4.4') === 0) {
                element.bind('click', function(e) {
                    filechooser.open( {}, function(data) {
                        scope.$apply(function () {
                            scope.fileread = data.filepath;
                        });
                    }, function(err) {
                        console.log('File Chooser Error : ' + err);
                    } );
                });
            }
        }
    }
}

angular.module('myWine')
    .directive('fileread', fileread);