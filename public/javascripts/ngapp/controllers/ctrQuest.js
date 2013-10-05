app.controller( 'ctrQuests', function ($scope, Quests) {

  $scope.quests = Quests.all;

  $scope.activate = function(quest) {
    quest.state = 1;
  }

  $scope.remove = function(quest) {
    quest.state = 0;
  }

  $scope.submitCode = function (quest, code) {
    quest.state = 2;
  }
});
