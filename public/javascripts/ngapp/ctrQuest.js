function ctrQuests($scope) {

  $scope.quests =[{
    state: 0,
    uid: 4,
    name: 'Принести артефакт',
    desc: 'Найти и принести артефакт "Медуза"'
  },{
    state: 0,
    uid: 3,
    name: 'Убить стрелка',
    desc: 'Найти и убить стлкера по имени Стрелок'
  },{
    state: 1,
    uid: 2,
    name: 'Принести артефакт',
    desc: 'Найти и принести артефакт "Улитка"'
  },{
    state: 2,
    uid: 1,
    name: 'Принести артефакт',
    desc: 'Найти и принести артефакт "Спираль"'
  }];

  $scope.activate = function(quest) {
    quest.state = 1;      
  }

  $scope.remove = function(quest) {
    quest.state = 0;
  }

  $scope.submitCode = function (quest, code) {
    quest.state = 2;
  }
}
